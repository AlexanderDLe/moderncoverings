import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: '#444',
        color: 'white',
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
    },
    warningIcon: {
        color: 'yellow',
        height: 65,
        width: 65,
        marginBottom: 8,
    },
    okayButton: {
        paddingTop: 16,
        color: '#93C9FF',
    },
}));

function CartModal({ modalOpen, setModalOpen }) {
    const classes = useStyles();

    return (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="Order Cancellation"
            aria-describedby="Are you sure?"
        >
            <div className={classes.modal}>
                <WarningIcon className={classes.warningIcon} />
                <div>Are you sure?</div>
                <br />
                <Button
                    onClick={() => setModalOpen(false)}
                    size="small"
                    color="primary"
                    className={classes.okayButton}
                >
                    Yes
                </Button>
            </div>
        </Modal>
    );
}

export default CartModal;
