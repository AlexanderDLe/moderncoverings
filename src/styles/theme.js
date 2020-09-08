import { createMuiTheme } from '@material-ui/core';
// import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
    typography: 'Raleway',
    palette: {
        primary: {
            main: '#424242',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 0,
            },
        },
    },
});
