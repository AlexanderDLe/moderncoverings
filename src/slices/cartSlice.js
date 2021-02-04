import { createSlice } from '@reduxjs/toolkit';
import keys from '../config/keys';

let initialOrders;
let initialAmount;
if (keys.mode === 'production') {
    initialOrders = [];
    initialAmount = 0;
}
if (keys.mode === 'sandbox') {
    initialOrders = [
        {
            type: 'Mask',
            color: 'Black Test',
            param: 'black',
            price: 12.5,
            img: 'Black.jpg',
            size: 'L',
            amount: '1',
        },
        {
            type: 'Mask',
            color: 'White Test',
            param: 'white',
            price: 12.5,
            img: 'White.jpg',
            size: 'M',
            amount: '2',
        },
    ];
    initialAmount = 3;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        usedDiscountButton: false,
        orders: initialOrders,
        amount: initialAmount
    }, 
    reducers: {
        setUsedDiscountButton(state) {
            state.usedDiscountButton = true;
        },
        addOrder(state, action) {
            let data = action.payload;

            // If identical mask already exist, add to the amount
            // Otherwise, we create a new separate line on order summary.
            let foundIdentical = false;
            for (let order of state.orders) {
                if (order.color === data.color && order.size === data.size) {
                    order.amount =
                        parseInt(order.amount) + parseInt(data.amount);
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
    }
})

export const { setUsedDiscountButton,
    addOrder, removeOrder, resetOrders } = cartSlice.actions;
export default cartSlice.reducer;