import { combineReducers } from 'redux';
import appReducer from '../slices/AppSlice/appSlice';
import cartReducer from '../slices/CartSlice/cartSlice';

const rootReducer = combineReducers({
    app: appReducer,
    cart: cartReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
