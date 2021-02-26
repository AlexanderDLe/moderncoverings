import { makeStyles } from '@material-ui/core/styles';

export const ItemImageStyles = makeStyles((theme) => ({
    media: {
        height: 280,
    },
    smallMedia: {
        height: 230,
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
}));
