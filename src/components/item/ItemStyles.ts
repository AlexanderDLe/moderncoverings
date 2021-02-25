import { makeStyles } from '@material-ui/core/styles';

export const ItemStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: 450,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        paddingBottom: 8,
        margin: 16,
        marginTop: 40,
        marginBottom: 40,
        borderRadius: '0',
    },
    bestseller: {
        position: 'absolute',
        color: 'red',
        right: 16,
        top: 16,
        textAlign: 'center',
    },
    media: {
        height: 280,
    },
    smallMedia: {
        height: 230,
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    buttonLink: {
        textDecoration: 'none',
        color: 'white',
    },
    customizeBox: {
        paddingTop: 16,
        display: 'flex',
    },
    itemActions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 8px',
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
    goToCartLink: {
        width: '100%',
    },
    addToCartButton: {
        width: '100%',
    },
}));
