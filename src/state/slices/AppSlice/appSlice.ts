import { ShowMoreObj, InitialState } from './Interfaces';
import { createSlice } from '@reduxjs/toolkit';
import keys from '../../../config/keys';

const defaultShowMoreObject: ShowMoreObj = {
    Bandana: true,
    Floral: true,
    Animal: true,
    Pattern: true,
    Solid: true,
    Hawaiian: true,
    Patriot: true,
    Shield: true,
    Holiday: true,
};

const initialState: InitialState = {
    mode: keys.mode,
    yCoordinateMask: 0,
    yCoordinateBag: 0,
    authenticated: localStorage.getItem('Authenticated') || false,
    showMoreMaskObj: defaultShowMoreObject,
    showMoreBagObj: defaultShowMoreObject,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setYCoordinateMask(state, action) {
            state.yCoordinateMask = action.payload;
        },
        setYCoordinateBag(state, action) {
            state.yCoordinateBag = action.payload;
        },
        setShowMoreMaskObj(state, action) {
            state.showMoreMaskObj = action.payload;
        },
        setShowMoreBagObj(state, action) {
            state.showMoreBagObj = action.payload;
        },
        login(state) {
            localStorage.setItem('Authenticated', 'true');
            state.authenticated = true;
        },
        logout(state) {
            localStorage.removeItem('Authenticated');
            state.authenticated = false;
        },
    },
});

export const {
    setYCoordinateMask,
    setYCoordinateBag,
    setShowMoreMaskObj,
    setShowMoreBagObj,
    login,
    logout,
} = appSlice.actions;

export default appSlice.reducer;
