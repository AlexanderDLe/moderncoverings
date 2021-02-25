import React from 'react';
import { SnackbarStyles, snackbarMediaQueries } from './SnackbarStyles';
import useMediaQueries from '../../utils/useMediaQueries';
import Snackbar from '@material-ui/core/Snackbar';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

interface Props {
    snackbarOpen: boolean;
    onClose: () => void;
}

const AppSnackbar = ({ snackbarOpen, onClose }: Props) => {
    const styles = SnackbarStyles();
    const { rootStyles, textSizeStyles } = snackbarMediaQueries(
        useMediaQueries().min600px
    );

    return (
        <Snackbar
            className={styles.root}
            open={snackbarOpen}
            autoHideDuration={30000}
            onClose={onClose}
            style={rootStyles}
        >
            <div className={styles.container}>
                <ReportProblemOutlinedIcon className={styles.warning} />
                <p className={styles.text} style={textSizeStyles}>
                    <strong>DEV MODE:</strong> PayPal Checkout is in Sandbox
                    Mode. Facebook Pixel is not initialized. Data will not be
                    logged to databases. Set mode to "production" before build.
                </p>
                <CloseOutlinedIcon onClick={onClose} className={styles.close} />
            </div>
        </Snackbar>
    );
};

export default AppSnackbar;
