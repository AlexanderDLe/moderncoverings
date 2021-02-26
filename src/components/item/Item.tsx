import React, { useEffect, useState, FC } from 'react';
import { useActions } from '../utils/useActions';
import axios from 'axios';
import keys from '../../config/keys';

import { ItemStyles } from './ItemStyles';
import useMediaQueries from '../utils/useMediaQueries';

import Linker from '../reusables/Linker/Linker';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import Title from '../reusables/Title/Title';
import ItemSnackbar from './ItemSnackbar/ItemSnackbar';
import ContainedButton from '../reusables/ContainedButton/ContainedButton';
import ItemImage from './ItemImage/ItemImage';
import Form from './forms/Form';
import ImageModal from './ImageModal/ImageModal';
import Spinner from '../reusables/Spinner/Spinner';
import allDesigns from '../../designs';
import * as Logic from './ItemLogic';
import { Designs } from '../../designs';

const API = keys.designsAPI;
const selection: Designs = allDesigns;

const Item: FC = ({ match }: any) => {
    const styles = ItemStyles();
    const { addOrder } = useActions();
    const { min420px, min600px } = useMediaQueries();
    const data = selection[match.params.id];

    const defaultOption = Logic.setDefaultOption(data.type);
    const { option, handleOptionChange } = Logic.HandleOptions(defaultOption);
    const { addWaistBag, handleAddWaistBag } = Logic.HandleAddWaistBag();
    const { angledState, handleAngleChange } = Logic.HandleImageAngle();
    const { modalOpen, handleModalOpen } = Logic.HandleModal();
    const handleSnackbar = Logic.HandleSnackbar();
    const handleAmount = Logic.HandleAmount();
    const amount = handleAmount.amount;
    const { snackbarOpen, msgInfo } = handleSnackbar;

    const [loading, setLoading] = useState(true);
    const [avail, setAvail] = useState(true);

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
    const handleAddItem = () => () => {
        addOrder(Logic.packageItem(data, addWaistBag, option, amount));
        handleSnackbar.addToQueue(amount);
    };

    const BagLink = <Linker path="/selection/bags" text="Bag Set Selection" />;
    const MaskLink = <Linker path="/selection/masks" text="Mask Selection" />;

    if (loading) return <Spinner />;
    return (
        <Card
            style={{ marginTop: min600px ? 40 : 16 }}
            className={styles.root}
            elevation={1}
        >
            <Title text={data.color} />
            <ItemImage
                min420px={min420px}
                handleModalOpen={handleModalOpen}
                handleAngleStateChange={handleAngleChange}
                angledState={angledState}
                data={data}
            />
            <Form
                type={data.type}
                avail={avail}
                amount={amount}
                size={option}
                price={data.price as number}
                addWaistBag={addWaistBag}
                handleOptionChange={handleOptionChange}
                handleAmountChange={handleAmount.change}
                incrementAmount={handleAmount.increment}
                decrementAmount={handleAmount.decrement}
                handleAddWaistBag={handleAddWaistBag}
            />
            <CardActions className={styles.itemActions}>
                {data.type === 'Bag' ? BagLink : MaskLink}
                <Linker path="/cart" text="Go To Cart" />
            </CardActions>
            <CardActions className={styles.itemActions}>
                {avail ? <ContainedButton callback={handleAddItem()} /> : ''}
            </CardActions>
            <ImageModal
                handleAngleStateChange={handleAngleChange}
                min420px={min420px}
                angledState={angledState}
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                data={data}
            />
            <ItemSnackbar
                messageInfo={msgInfo}
                snackbarOpen={snackbarOpen}
                handleCloseSnackbar={() =>
                    handleSnackbar.handleSnackbarOpen(false)
                }
                handleExited={handleSnackbar.handleExited}
            />
        </Card>
    );
};

export default Item;
