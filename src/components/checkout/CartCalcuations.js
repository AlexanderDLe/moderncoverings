import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Upsell from './Upsell';

const useStyles = makeStyles((theme) => ({
    caption: {
        fontSize: '.7rem',
        color: 'rgba(0,0,0,.5)',
    },
    cartCalculation: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    total: {
        fontWeight: 700,
    },
    cartTitle: {
        fontFamily: 'Open Sans',
    },
    cartTotal: {
        fontWeight: 700,
    },
    promoBox: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    check: {
        marginLeft: 0,
        color: '#1CCE1C',
        fontSize: '0rem',
        transition: 'all .33s',
    },
    discountCaption: {
        display: 'block',
        fontSize: '.75rem',
        color: 'rgba(255,0,0,0)',
        transition: 'all .33s',
    },
    discountButton: {
        marginTop: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    taxField: {
        marginBottom: 0,
    },
}));

export default ({
    orders,
    checkoutMode,
    amount,
    subtotal,
    total,
    shippingFee,
    discount,
    discountCode,
    tax,
    discountField,
    discountThreshold,
    setDiscountField,
    usedDiscountButton,
    setUsedDiscountButton,
}) => {
    const classes = useStyles();

    const discountCaptionStyle = useMemo(() => {
        return discountField === discountCode && subtotal < discountThreshold
            ? {
                  color: 'rgba(255,0,0,.7)',
              }
            : {};
    }, [subtotal, discountCode, discountField, discountThreshold]);
    const checkStyle = useMemo(() => {
        return discountField === discountCode && subtotal > discountThreshold
            ? {
                  marginLeft: 8,
                  fontSize: '1rem',
                  transform: 'scale(1.25)',
              }
            : {};
    }, [subtotal, discountCode, discountField, discountThreshold]);

    const renderDiscountFields = () => {
        if (checkoutMode === 'CART') {
            return (
                <React.Fragment>
                    <div className={classes.cartCalculation}>
                        <TextField
                            margin="none"
                            size="small"
                            onChange={(e) => {
                                setDiscountField(e.target.value.toUpperCase());
                            }}
                            label="Discount Code"
                            value={discountField}
                            className={classes.discountField}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MoneyOffIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={classes.promoBox}>
                            -${discount}
                            <CheckIcon
                                className={classes.check}
                                style={checkStyle}
                            />
                        </div>
                    </div>
                    {subtotal < discountThreshold || usedDiscountButton ? (
                        <Button
                            className={classes.discountButton}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                                setDiscountField('15OFF');
                                setUsedDiscountButton(true);
                            }}
                        >
                            Apply Discount Code 15OFF
                        </Button>
                    ) : (
                        ''
                    )}
                    <span
                        className={classes.discountCaption}
                        style={discountCaptionStyle}
                    >
                        Discount is limited to $45+ subtotal orders.
                    </span>
                </React.Fragment>
            );
        } else if (checkoutMode === 'CHECKOUT') {
            return (
                <div
                    className={classes.cartCalculation}
                    style={{ paddingBottom: 8 }}
                >
                    <div style={{ paddingTop: 4 }}>
                        <p className={classes.taxField}>Discount</p>
                    </div>
                    <div className={classes.promoBox}>
                        -${discount}
                        <CheckIcon
                            className={classes.check}
                            style={checkStyle}
                        />
                    </div>
                </div>
            );
        }
    };

    if (amount === 0)
        return <div style={{ paddingBottom: 8 }}>Your cart is empty</div>;
    return (
        <React.Fragment>
            <div className={classes.cartCalculation}>
                <div style={{ paddingTop: 16 }}>
                    <p>Subtotal</p>
                </div>
                <p style={{ marginBottom: 0, marginTop: 16 }}>${subtotal}</p>
            </div>
            <div className={classes.cartCalculation}>
                <p>
                    Shipping
                    <br />
                    <span className={classes.caption}>
                        Free shipping for all domestic (US) orders.
                    </span>
                    <br />
                    <span className={classes.caption}>
                        Delivery will be between 5-9 business days.
                    </span>
                </p>
                <p>${shippingFee}</p>
            </div>
            {renderDiscountFields()}
            <div
                className={classes.cartCalculation}
                style={{ marginBottom: 0 }}
            >
                <div style={{ paddingTop: 4 }}>
                    <p className={classes.taxField}>Tax</p>
                </div>
                <p className={classes.taxField}>${tax}</p>
            </div>
            <hr
                style={{
                    border: 'none',
                    borderBottom: '1px solid rgba(0,0,0,.2)',
                }}
            />
            <div className={classes.cartCalculation}>
                <p className={classes.cartTotal}>Total</p>
                <p className={classes.cartTotal}>${total}</p>
            </div>
            <Upsell checkoutMode={checkoutMode} orders={orders} />
        </React.Fragment>
    );
};
