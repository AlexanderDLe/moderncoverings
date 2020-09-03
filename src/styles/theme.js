import { createMuiTheme } from '@material-ui/core';
// import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 0,
            },
        },
    },
});
