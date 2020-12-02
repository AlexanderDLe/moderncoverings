import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import keys from '../../config/keys';
import axios from 'axios';
import ReactGA from 'react-ga';
import ReactPinterestTag from 'react-pinterest-tag';

import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Modal from '@material-ui/core/Modal';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MaskOrderForm from './MaskOrderForm';
import ElasticOrderForm from './ElasticOrderForm';
import ShieldOrderForm from './ShieldOrderForm';
import { selection } from '../designs/MaskDesigns';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: 450,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        paddingBottom: 8,
        margin: 16,
        marginTop: 40,
        marginBottom: 40,
        borderRadius: '0',
    },
    bestseller: {
        position: 'absolute',
        color: 'red',
        right: 16,
        top: 16,
        textAlign: 'center',
    },
    media: {
        height: 280,
    },
    smallMedia: {
        height: 230,
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    buttonLink: {
        textDecoration: 'none',
        color: 'white',
    },
    customizeBox: {
        paddingTop: 16,
        display: 'flex',
    },
    itemActions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 8px',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '1080px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    innerModal: {
        position: 'relative',
        padding: 0,
        margin: 0,
    },
    modalLeftChevron: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '10px',
        fontSize: '2rem',
    },
    modalRightChevron: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: '10px',
        fontSize: '2rem',
    },
    title: {
        paddingBottom: 0,
        marginBottom: 0,
        fontFamily: 'Raleway',
    },
    goToCartLink: {
        width: '100%',
    },
    addToCartButton: {
        width: '100%',
    },
}));

const API = keys.designsAPI;

export default ({ match, addOrder }) => {
    const navMediaQuery = useMediaQuery('(min-width:420px)');
    const navMediaQuery600 = useMediaQuery('(min-width:600px)');

    const classes = useStyles();
    const data = selection[match.params.id];
    console.log(data);

    const defaultSize =
        data.type === 'Mask'
            ? 'L'
            : data.type === 'Elastic'
            ? '200 Yards'
            : '1x';
    console.log(defaultSize);

    const [size, setSize] = React.useState(defaultSize);
    const [amount, setAmount] = React.useState(1);
    const [modalOpen, setModalOpen] = React.useState(false);
    const queueRef = useRef([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [angledState, setAngledState] = useState('PostPhotos');
    const [avail, setAvail] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                const availability = response.data[data.param]
                    ? response.data[data.param]
                    : false;
                console.log(response.data[data]);
                setAvail(availability);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setAvail(false);
                setLoading(false);
            }
        }
        fetchData();
    }, [data]);

    // Mask Order Configuration
    const handleChange = (event) => {
        setSize(event.target.value);
    };
    const handleAmountChange = (event) => {
        // Use Math.ceil to round up any decimals
        setAmount(Math.ceil(event.target.value));
    };
    const handleAddItem = () => () => {
        let price = 0;
        if (data.type === 'Mask') price = data.price;
        if (data.type === 'Elastic') price = data.price[size];
        if (data.type === 'Shield') price = data.price[size];
        addOrder({
            type: data.type,
            color: data.color,
            size: size,
            amount: amount,
            param: data.param,
            price: price,
            img: data.img,
        });
        queueRef.current.push({
            message: `Added ${amount} item(s) to cart`,
            key: new Date().getTime(),
        });

        ReactGA.event({
            category: 'ecommerce',
            action: 'add_to_cart',
        });

        // Pinterest Event
        ReactPinterestTag.track('addtocart', {
            value: price * amount,
            order_quantity: amount,
            currency: 'USD',
        });

        if (snackbarOpen) {
            setSnackbarOpen(false);
        } else {
            processQueue();
        }
    };

    const incrementAmount = () => {
        setAmount(amount + 1);
    };
    const decrementAmount = () => {
        if (amount > 1) setAmount(amount - 1);
    };

    // Snackbar
    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setSnackbarOpen(true);
        }
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    const handleExited = () => {
        processQueue();
    };

    // Modal
    const handleAngleStateChange = () => {
        if (angledState === 'PostPhotos') setAngledState('AngledPhotos');
        if (angledState === 'AngledPhotos') setAngledState('PostPhotos');
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const modalActions = (
        <div className={classes.modalActions}>
            <ChevronLeftIcon
                onClick={handleAngleStateChange}
                className={classes.modalLeftChevron}
                style={{ fontSize: `${navMediaQuery ? '' : ''}` }}
            />
            <ChevronRightIcon
                onClick={handleAngleStateChange}
                className={classes.modalRightChevron}
            />
        </div>
    );
    const modalContent = (
        <div className={classes.modal}>
            <div className={classes.innerModal}>
                <img
                    src={require(`../../img/MaskPhotos/${angledState}/${data.img}`)}
                    alt="Mask"
                    onClick={handleModalClose}
                    style={{ width: '100%', padding: 0 }}
                />
                {data.angled ? modalActions : ''}
            </div>
        </div>
    );

    return (
        <Card
            style={{ marginTop: navMediaQuery600 ? 40 : 16 }}
            className={classes.root}
            elevation={1}
        >
            {loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        padding: 100,
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <React.Fragment>
                    <CardContent className={classes.title}>
                        <Typography
                            className={classes.title}
                            gutterBottom
                            variant="h4"
                            component="h2"
                        >
                            {data.color}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={
                            navMediaQuery ? classes.media : classes.smallMedia
                        }
                        image={require(`../../img/MaskPhotos/PostPhotos/${data.img}`)}
                        title={data.color}
                        onClick={handleModalOpen}
                        style={{ cursor: 'pointer' }}
                    />
                    {!avail ? (
                        <div style={{ textAlign: 'center' }}>
                            Sorry, this design is no longer available.
                        </div>
                    ) : data.type === 'Mask' ? (
                        <MaskOrderForm
                            handleChange={handleChange}
                            amount={amount}
                            size={size}
                            navMediaQuery={navMediaQuery}
                            handleAmountChange={handleAmountChange}
                            price={data.price}
                            XLUnavailable={data.XLUnavailable ? true : false}
                            incrementAmount={incrementAmount}
                            decrementAmount={decrementAmount}
                        />
                    ) : data.type === 'Elastic' ? (
                        <ElasticOrderForm
                            handleChange={handleChange}
                            amount={amount}
                            size={size}
                            navMediaQuery={navMediaQuery}
                            handleAmountChange={handleAmountChange}
                            incrementAmount={incrementAmount}
                            decrementAmount={decrementAmount}
                        />
                    ) : (
                        <ShieldOrderForm
                            handleChange={handleChange}
                            amount={amount}
                            size={size}
                            navMediaQuery={navMediaQuery}
                            handleAmountChange={handleAmountChange}
                            incrementAmount={incrementAmount}
                            decrementAmount={decrementAmount}
                        />
                    )}
                    <CardActions className={classes.itemActions}>
                        <Link to="/selection" className={classes.link}>
                            <Button size="small" color="primary">
                                Mask Selection
                            </Button>
                        </Link>
                        <Link to="/cart" className={classes.link}>
                            <Button size="small" color="primary">
                                Go To Cart
                            </Button>
                        </Link>
                    </CardActions>
                    {avail ? (
                        <CardActions className={classes.itemActions}>
                            <Button
                                variant="contained"
                                onClick={handleAddItem()}
                                size="medium"
                                color="primary"
                                className={classes.addToCartButton}
                            >
                                Add To Cart
                            </Button>
                        </CardActions>
                    ) : (
                        ''
                    )}
                </React.Fragment>
            )}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="Mask Image"
                aria-describedby="Modal to pop up facemask image."
            >
                {modalContent}
            </Modal>
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                onExited={handleExited}
                message={messageInfo ? messageInfo.message : undefined}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Card>
    );
};
