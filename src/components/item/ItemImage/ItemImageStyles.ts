import { makeStyles } from '@material-ui/core/styles';

export const ItemImageStyles = makeStyles((theme) => ({
    media: {
        height: 280,
    },
    smallMedia: {
        height: 230,
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '1080px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    innerModal: {
        position: 'relative',
        padding: 0,
        margin: 0,
    },
    modalLeftChevron: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '10px',
        fontSize: '2rem',
    },
    modalRightChevron: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: '10px',
        fontSize: '2rem',
    },
    title: {
        paddingBottom: 0,
        marginBottom: 0,
        fontFamily: 'Raleway',
    },
}));
