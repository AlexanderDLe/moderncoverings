import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        color: '#3f51b5',
        textDecoration: 'none',
    },
    designItemName: {
        color: 'black',
        textDecoration: 'none',
    },
    removeButton: {
        fontSize: '.7rem',
        color: 'red',
        cursor: 'pointer',
    },
    cartCalculation: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    designImage: {
        height: 'auto',
        width: '120px',
    },
    itemRightColumn: {
        marginTop: 'auto',
        marginBottom: 18,
        textAlign: 'right',
    },
    itemRightColumnCheckout: {
        marginTop: '10px',
        marginBottom: 'auto',
    },
    designText: {
        padding: 9,
    },
}));

export default ({ checkoutMode, orders, removeOrder }) => {
    const classes = useStyles();
    const navMediaQuery = useMediaQuery('(min-width:600px)');

    const designName = useMemo(() => {
        const size = navMediaQuery ? '1rem' : '.9rem';
        return {
            color: 'black',
            textDecoration: 'none',
            fontSize: size,
        };
    }, [navMediaQuery]);

    const renderRightColumn = (orderData) => {
        if (checkoutMode === 'CART') {
            return (
                <p className={classes.itemRightColumn}>
                    ${orderData.price * orderData.amount} <br />{' '}
                    <span
                        className={classes.removeButton}
                        onClick={() => removeOrder(orderData)}
                    >
                        Remove
                    </span>
                </p>
            );
        } else if (checkoutMode === 'CHECKOUT') {
            return (
                <p className={classes.itemRightColumnCheckout}>
                    ${orderData.price * orderData.amount} <br />{' '}
                </p>
            );
        }
    };

    return (
        <React.Fragment>
            {orders.map((order, index) => (
                <div className={classes.cartCalculation} key={index}>
                    <div style={{ display: 'flex' }}>
                        <Link to={`/item/${order.param}`}>
                            <img
                                src={require(`../../img/SmallMaskPhotos/${order.img}`)}
                                alt="Facemask"
                                className={classes.designImage}
                                style={{ marginLeft: -28 }}
                            />
                        </Link>
                        <div className={classes.designText}>
                            <Typography variant="body1" component="h2">
                                <Link
                                    // className={classes.designItemName}
                                    style={designName}
                                    to={`/item/${order.param}`}
                                >
                                    {order.amount}x {order.color}{' '}
                                    {/* {order.type === 'Mask' ? 'Design' : ''} */}
                                </Link>
                            </Typography>
                            <Typography variant="caption" component="h2">
                                {order.type === 'Shield' ? 'Amount' : 'Size'}{' '}
                                {order.size}
                            </Typography>
                        </div>
                    </div>
                    {renderRightColumn(order)}
                </div>
            ))}
        </React.Fragment>
    );
};
