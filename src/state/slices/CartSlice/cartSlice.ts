import { InitialCartState } from './Interfaces';
import { getInitialAmount, getInitialOrders } from './Initializers';
import { createSlice } from '@reduxjs/toolkit';
import keys from '../../../config/keys';

const initialState: InitialCartState = {
    usedDiscountButton: false,
    orders: getInitialOrders(keys.mode),
    amount: getInitialAmount(keys.mode),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUsedDiscountButton(state) {
            state.usedDiscountButton = true;
        },
        addOrder(state, action) {
            let data = action.payload;
            let foundIdentical = false;
            for (let order of state.orders) {
                if (order.color === data.color && order.size === data.size) {
                    order.amount = order.amount + data.amount;
                    foundIdentical = true;
                }
            }
            if (!foundIdentical) state.orders.push(data);
            state.amount += data.amount;
        },
        removeOrder(state, action) {
            const newOrders = [];
            const data = action.payload;

            for (let order of state.orders) {
                if (data.color === order.color && data.size === order.size)
                    continue;
                newOrders.push(order);
            }
            state.orders = newOrders;
            state.amount -= parseInt(data.amount);
        },
        resetOrders(state) {
            state.orders = [];
            state.amount = 0;
        },
    },
});

export const {
    setUsedDiscountButton,
    addOrder,
    removeOrder,
    resetOrders,
} = cartSlice.actions;
export default cartSlice.reducer;
