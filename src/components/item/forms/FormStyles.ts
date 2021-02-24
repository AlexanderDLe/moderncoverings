import { makeStyles } from '@material-ui/core/styles';

export const FormStyles = makeStyles((theme) => ({
    customizeBox: {
        paddingTop: 16,
        display: 'flex',
    },
    spanDimensions: {
        paddingLeft: 8,
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    smallSpanDimensions: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    radioLabel: {
        color: 'black !important',
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    sizeLabel: {
        color: 'rgba(0, 0, 0, 0.54) !important',
    },
    label: {
        paddingBottom: 8,
    },
    checkboxContainer: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    checkbox: {
        marginLeft: -8,
    },
    checkboxText: {
        display: 'inline',
        fontSize: '16px',
        color: '#666',
    },
    compareAtPrice: {
        textDecorationLine: 'line-through !important',
    },
}));

export const AmountFieldStyles = makeStyles((theme) => ({
    amountBox: {
        display: 'flex',
    },
    amountField: {
        marginTop: 10,
        paddingLeft: 5,
        width: '70%',
    },
    arrowsBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    arrow: {
        cursor: 'pointer',
    },
}));

export const LabelStyles = makeStyles((theme) => ({
    label: {
        paddingBottom: 8,
    },
    spanDimensions: {
        paddingLeft: 8,
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    smallSpanDimensions: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
