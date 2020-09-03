import React, { useEffect, useState, useMemo } from 'react';
import keys from '../../config/keys';
import { Link, Redirect } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useMediaQuery } from '@material-ui/core';
import moment from 'moment-timezone';
import ReactGA from 'react-ga';
import ReactPinterestTag from 'react-pinterest-tag';
import TagManager from 'react-gtm-module';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CartItems from './CartItems';
import CartCalculations from './CartCalcuations';
import CartModal from './CartModal';

import axios from 'axios';
import createTrelloDescription from './createTrelloDescription';
import createTrelloLabel from './createTrelloLabel';

const API = keys.emailConfirmationAPI;
const trelloAPI = keys.trelloAPI;
const header = {
    'Content-Type': 'application/json',
};
const client = {
    sandbox: keys.paypalSandboxID,
    production: keys.paypalProductionID,
};
const currency = 'USD';
const discountCode = '15OFF';
const discountThreshold = 45;
const shippingFee = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        borderBottom: '2px solid #3f51b5',
        paddingBottom: 8,
        margin: 16,
    },
    link: {
        color: '#3f51b5',
        textDecoration: 'none',
    },
    cartTitle: {
        fontFamily: 'Open Sans',
    },
    paypalError: {
        textAlign: 'center',
        color: 'red',
    },
    backToSelectionButton: {
        margin: '8px 16px',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    warningIcon: {
        color: 'red',
        height: 65,
        width: 65,
        marginBottom: 8,
    },
    itemActions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 8px',
    },
}));

const calculateTimestamp = (time) => {
    let timestamp = time;
    console.log(timestamp);
    timestamp = moment(timestamp).tz('America/Los_Angeles').format().toString();
    timestamp = timestamp.split('T').join(' ');
    timestamp = timestamp.slice(0, timestamp.length - 9) + ' PT';
    return timestamp;
};

const calculateSubtotal = (orders) => {
    let subtotal = 0;
    for (let order of orders) {
        subtotal += order.price * order.amount;
    }
    return subtotal;
};

const extractOrderData = (ordersToExtract) => {
    let extractedOrders = [];
    for (let order of ordersToExtract) {
        extractedOrders.push({
            color: order.color,
            price: order.price,
            size: order.size,
            amount: order.amount,
        });
    }
    return extractedOrders;
};

const CART = 'CART';
const CHECKOUT = 'CHECKOUT';

const Cart = ({
    orders,
    removeOrder,
    resetOrders,
    amount,
    mode,
    logReactPixelPurchase,
    usedDiscountButton,
    setUsedDiscountButton,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const classes = useStyles();
    const [checkoutMode, setCheckoutMode] = useState(CART);
    const [paypalError, setPaypalError] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [discountField, setDiscountField] = useState('');
    const navMediaQuery600 = useMediaQuery('(min-width:600px)');

    // Checkout Configuration
    const itemAmount = amount;
    const env = mode;
    const subtotal = useMemo(() => {
        return calculateSubtotal(orders);
    }, [orders]);
    const discount = useMemo(() => {
        return discountField.toUpperCase() === discountCode &&
            subtotal >= discountThreshold
            ? Math.ceil(subtotal * 0.15 * 100) / 100
            : 0;
    }, [subtotal, discountField]);
    const pretaxTotal = useMemo(() => {
        return ((subtotal + shippingFee - discount) * 100) / 100;
    }, [subtotal, discount]);
    const tax = useMemo(() => {
        return Math.round(pretaxTotal * 0.07 * 100) / 100;
    }, [pretaxTotal]);

    const total = useMemo(() => {
        return Math.round((pretaxTotal + tax) * 100) / 100;
    }, [pretaxTotal, tax]);

    console.log(total);

    // Checkout Functionality
    const onSuccess = async (details, data) => {
        const info = details.purchase_units[0];
        const address = {
            recipient_name: info.shipping.name.full_name,
            line1: info.shipping.address.address_line_1,
            line2: info.shipping.address.address_line_2,
            city: info.shipping.address.admin_area_2,
            state: info.shipping.address.admin_area_1,
            postal_code: info.shipping.address.postal_code,
            country_code: info.shipping.address.country_code,
        };
        const email = details.payer.email_address;
        const orderID = data.orderID;
        const amount = info.amount.value;
        let timestamp = calculateTimestamp(details.create_time);
        let orderData = extractOrderData(orders);
        const event = {
            orders: orderData,
            address,
            email,
            orderID,
            amount,
            timestamp,
            mode,
            subtotal,
            discount,
            tax,
        };

        console.log('Details: ', details);
        console.log('Data: ', data);
        console.log('Event: ', event);

        const cardName = `${
            address.recipient_name
        } (${itemAmount}) - ${orderID.slice(0, 3)}`;
        const newCard = {
            name: cardName,
            pos: 'bottom',
            idLabels: createTrelloLabel(),
            idCardSource: '5ef183a95443f525b947c506',
            keepFromSource: 'checklists',
            desc: createTrelloDescription(event),
        };
        console.log(newCard);

        if (mode === 'production') {
            try {
                await axios.post(trelloAPI, newCard);
            } catch (error) {
                console.log(error);
            }
            try {
                await axios.post(API, event, header);
            } catch (error) {
                console.log(error);
            }
        }

        // FB Pixel Purchase
        logReactPixelPurchase({
            currency: 'USD',
            value: amount,
        });

        // Pinterest Event
        ReactPinterestTag.track('checkout', {
            order_id: orderID,
            value: parseInt(amount),
            currency: 'USD',
        });

        // Google Tag Manager Data Layer
        const tagManagerArgs = {
            gtmId: 'GTM-MRHPV6X',
            dataLayer: {
                event: 'CAF_Purchase',
                caf_orderID: orderID,
                caf_value: amount,
            },
        };
        TagManager.dataLayer(tagManagerArgs);

        // Google Analytics
        ReactGA.plugin.execute('ec', 'setAction', 'purchase', {
            id: orderID,
            affiliation: 'CA Facemasks',
            revenue: amount,
            shipping: 0,
            tax: 0,
            currency: 'USD',
        });
        /* ReactGA.plugin.execute('ec', 'setAction', 'purchase', {
            id: orderID,
            name: 'Purchase',
            sku: 'A1',
            category: 'Face Coverings',
            price: amount.toString(),
            quantity: itemAmount.toString,
        }); */
        ReactGA.plugin.execute('ec', 'send');
        ReactGA.plugin.execute('ec', 'clear');

        resetOrders();
        setCheckedOut(true);
    };
    const onCancel = (data) => {
        // setModalOpen(true);
        console.log('The payment was canceled', data);
    };
    const onError = (err) => {
        console.log('There was an error', err);
        setPaypalError(true);
    };

    // Cart Root Styles
    const cartRootStyles = useMemo(() => {
        let marginTop = navMediaQuery600 ? 40 : 16;
        return { marginTop };
    }, [navMediaQuery600]);

    // Cart Actions
    const renderCartActions = () => {
        if (checkoutMode === CART) {
            return (
                <CardActions className={classes.itemActions}>
                    <Link to="/selection" className={classes.link}>
                        <Button size="small" color="primary">
                            Mask Selection
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setCheckoutMode(CHECKOUT)}
                        size="small"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </CardActions>
            );
        } else if (checkoutMode === CHECKOUT) {
            return (
                <CardActions className={classes.itemActions}>
                    <Button
                        onClick={() => setCheckoutMode(CART)}
                        size="small"
                        color="primary"
                    >
                        Back To Cart
                    </Button>
                </CardActions>
            );
        }
    };

    // PayPal Checkout Button
    const renderPayPalButton = () => {
        if (amount === 0 || checkoutMode === CART) return;
        return (
            <div style={{ padding: '0px 16px' }}>
                <PayPalButton
                    currency={currency}
                    amount={total}
                    onSuccess={onSuccess}
                    onError={onError}
                    catchError={onError}
                    options={{ clientId: client[env] }}
                    onCancel={onCancel}
                />
            </div>
        );
    };

    if (checkedOut) return <Redirect to="/success" />;

    return (
        <Card style={cartRootStyles} className={classes.root} elevation={3}>
            <CardContent>
                <Typography
                    className={classes.cartTitle}
                    variant="h4"
                    component="h2"
                >
                    {checkoutMode === CART ? 'Cart' : 'Checkout'}
                </Typography>
            </CardContent>

            <CardContent>
                <CartItems
                    checkoutMode={checkoutMode}
                    orders={orders}
                    removeOrder={removeOrder}
                />
                <CartCalculations
                    orders={orders}
                    checkoutMode={checkoutMode}
                    amount={amount}
                    subtotal={subtotal}
                    total={total}
                    tax={tax}
                    shippingFee={shippingFee}
                    discountCode={discountCode}
                    discount={discount}
                    discountField={discountField}
                    setDiscountField={setDiscountField}
                    discountThreshold={discountThreshold}
                    usedDiscountButton={usedDiscountButton}
                    setUsedDiscountButton={setUsedDiscountButton}
                />
            </CardContent>
            <CartModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

            {renderPayPalButton()}
            {renderCartActions()}
            {paypalError ? (
                <div className={classes.paypalError}>
                    Sorry, there was an error. There may have been an issue with
                    your payment information or the PayPal servers.
                </div>
            ) : (
                ''
            )}
        </Card>
    );
};

export default Cart;
