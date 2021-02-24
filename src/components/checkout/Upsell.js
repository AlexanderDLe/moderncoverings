import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FaceShieldImg from '../../img/ProductPhotos/Small/FaceShieldSquare.jpg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    containBoxes: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
}));

const searchForShields = (orders) => {
    for (let order of orders) {
        if (order.type === 'Shield') return true;
    }

    return false;
};

const Upsell = ({ orders, checkoutMode }) => {
    const classes = useStyles();

    if (searchForShields(orders) || checkoutMode === 'CHECKOUT') return '';
    return (
        <div className={classes.container}>
            <img
                src={FaceShieldImg}
                className={classes.img}
                alt="Face Shield"
            />
            <div className={classes.containBoxes}>
                <p>
                    Would you like to add Face Shields to your order for extra
                    protection?
                </p>
                <Link to="/item/faceshield">
                    <Button variant="contained" color="primary" size="small">
                        Yes
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Upsell;
