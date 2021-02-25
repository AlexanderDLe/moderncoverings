import React, { useEffect, useState, useRef } from 'react';
import { useActions } from '../utils/useActions';

import Linker from '../reusables/Linker/Linker';
import keys from '../../config/keys';
import axios from 'axios';
import { ItemStyles } from './ItemStyles';
import useMediaQueries from '../utils/useMediaQueries';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ItemImage from './ItemImage/ItemImage';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from './forms/Form';
import selection from '../../designs';
import ImageModal from './ImageModal/ImageModal';
import { setDefaultOption, HandleOptionChange } from './ItemLogic';

const API = keys.designsAPI;

const Item = ({ match }) => {
    const styles = ItemStyles();
    const { addOrder } = useActions();
    const { min420px, min600px } = useMediaQueries();

    const data = selection[match.params.id];
    const defaultOption = setDefaultOption(data.type);

    const { option, handleOptionChange } = HandleOptionChange(defaultOption);
    const [amount, setAmount] = React.useState(1);
    const [modalOpen, setModalOpen] = React.useState(false);
    const queueRef = useRef([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [angledState, setAngledState] = useState('Normal');
    const [avail, setAvail] = useState(true);
    const [loading, setLoading] = useState(true);
    const [addWaistBag, setAddWaistBag] = useState(false);
    const waistBagPrice = 15;

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                const availability = response.data[data.param]
                    ? response.data[data.param]
                    : false;
                setAvail(availability);
                setLoading(false);
            } catch (error) {
                setAvail(false);
                setLoading(false);
            }
        }
        fetchData();
    }, [data]);

    // Mask Order Configuration
    const handleAmountChange = (event) => {
        // Use Math.ceil to round up any decimals
        console.log(event.target.value);
        setAmount(Math.ceil(event.target.value));
    };
    const handleAddItem = () => () => {
        let price = 0;
        if (data.type === 'Mask') price = data.price;
        else if (data.type === 'Bag') {
            price = data.price;
            if (addWaistBag) price += waistBagPrice;
        } else if (data.type === 'Elastic') price = data.price[option];
        else if (data.type === 'Shield') price = data.price[option];

        let productName = data.color;
        if (data.type === 'Bag') {
            if (addWaistBag) productName = `3 piece ${data.color}`;
            else productName = `2 piece ${data.color}`;
        }

        addOrder({
            type: data.type,
            color: productName,
            size: option,
            amount: amount,
            param: data.param,
            price: price,
            img: data.img,
        });
        queueRef.current.push({
            message: `Added ${amount} item(s) to cart`,
            key: new Date().getTime(),
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
        if (angledState === 'Normal') setAngledState('Angled');
        if (angledState === 'Angled') setAngledState('Normal');
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const BagLink = <Linker path="/selection/bags" text="Bag Set Selection" />;
    const MaskLink = <Linker path="/selection/masks" text="Mask Selection" />;

    return (
        <Card
            style={{ marginTop: min600px ? 40 : 16 }}
            className={styles.root}
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
                    <CardContent className={styles.title}>
                        <Typography
                            className={styles.title}
                            gutterBottom
                            variant="h4"
                            component="h2"
                        >
                            {data.color}
                        </Typography>
                    </CardContent>
                    <ItemImage
                        min420px={min420px}
                        handleModalOpen={handleModalOpen}
                        handleAngleStateChange={handleAngleStateChange}
                        angledState={angledState}
                        data={data}
                    />
                    <Form
                        type={data.type}
                        avail={avail}
                        amount={amount}
                        size={option}
                        price={data.price}
                        XLUnavailable={data.XLUnavailable ? true : false}
                        addWaistBag={addWaistBag}
                        waistBagPrice={waistBagPrice}
                        handleOptionChange={handleOptionChange}
                        handleAmountChange={handleAmountChange}
                        incrementAmount={incrementAmount}
                        decrementAmount={decrementAmount}
                        setAddWaistBag={setAddWaistBag}
                    />
                    <CardActions className={styles.itemActions}>
                        {data.type === 'Bag' ? BagLink : MaskLink}
                        <Linker path="/cart" text="Go To Cart" />
                    </CardActions>
                    {avail ? (
                        <CardActions className={styles.itemActions}>
                            <Button
                                variant="contained"
                                onClick={handleAddItem()}
                                size="medium"
                                color="primary"
                                className={styles.addToCartButton}
                            >
                                Add To Cart
                            </Button>
                        </CardActions>
                    ) : (
                        ''
                    )}
                </React.Fragment>
            )}

            <ImageModal
                handleAngleStateChange={handleAngleStateChange}
                min420px={min420px}
                angledState={angledState}
                handleModalClose={handleModalClose}
                modalOpen={modalOpen}
                data={data}
            />
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
                            className={styles.close}
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

export default Item;
