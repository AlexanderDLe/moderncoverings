import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#444',
        borderRadius: '10px',
        color: 'white',
        padding: 12,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning: {
        color: 'yellow',
        fontSize: '1.5rem',
    },
    text: {
        padding: '0px 8px 0px 12px',
        margin: 0,
    },
    close: {
        cursor: 'pointer',
        fontSize: '1.5rem',
    },
}));

const AppSnackbar = ({ snackbarOpen, onClose }) => {
    const classes = useStyles();
    const navMediaQuery = useMediaQuery('(min-width:600px)');

    const snackbarRoot = useMemo(() => {
        return navMediaQuery
            ? {
                  width: 'auto',
                  maxWidth: 800,
                  margin: '0 auto',
              }
            : {};
    }, [navMediaQuery]);

    const textSize = useMemo(() => {
        let rem = navMediaQuery ? '.925rem' : '.825rem';
        return { fontSize: rem };
    }, [navMediaQuery]);

    return (
        <Snackbar
            className={classes.root}
            open={snackbarOpen}
            autoHideDuration={30000}
            onClose={onClose}
            style={snackbarRoot}
        >
            <div className={classes.container}>
                <ReportProblemOutlinedIcon className={classes.warning} />
                <p className={classes.text} style={textSize}>
                    <strong>DEV MODE:</strong> PayPal Checkout is in Sandbox
                    Mode. Facebook Pixel is not initialized. Data will not be
                    logged to databases. Set mode to "production" before build.
                </p>
                <CloseOutlinedIcon
                    onClick={onClose}
                    className={classes.close}
                />
            </div>
        </Snackbar>
    );
};

export default AppSnackbar;
