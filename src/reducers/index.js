import { combineReducers } from 'redux';
import appReducer from '../slices/appSlice';
import cartReducer from '../slices/cartSlice';

export default combineReducers({
    app: appReducer,
    cart: cartReducer
});