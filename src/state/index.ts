import * as AppActions from './slices/AppSlice/appSlice';
import * as CartActions from './slices/CartSlice/cartSlice';

export { store } from './store';
export type { RootState } from './reducers/index';
export const allActions = { ...AppActions, ...CartActions };
