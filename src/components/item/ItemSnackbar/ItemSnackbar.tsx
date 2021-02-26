import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface Message {
    message: string;
    key: number;
}

interface Props {
    messageInfo: Message | undefined;
    snackbarOpen: boolean;
    handleCloseSnackbar: () => void;
    handleExited: () => void;
}

const ItemSnackbar = ({
    messageInfo,
    snackbarOpen,
    handleCloseSnackbar,
    handleExited,
}: Props) => {
    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            onExited={handleExited}
            message={messageInfo ? messageInfo.message : undefined}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                >
                    <CloseIcon />
                </IconButton>
            }
        />
    );
};

export default ItemSnackbar;
