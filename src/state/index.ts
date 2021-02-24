import * as AppActions from './slices/AppSlice/appSlice';
import * as CartActions from './slices/CartSlice/cartSlice';

export type { RootState } from './reducers/index';
export const allActions = { ...AppActions, ...CartActions };
