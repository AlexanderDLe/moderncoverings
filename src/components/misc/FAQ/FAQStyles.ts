import { makeStyles } from '@material-ui/core/styles';

export const FAQStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 750,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        padding: 16,
        margin: 24,
        marginTop: 40,
        borderRadius: 0,
    },
    Raleway: {
        fontFamily: 'Raleway',
    },
    question: {
        paddingLeft: 10,
        fontSize: '1.25rem',
        paddingTop: 12,
        fontFamily: 'Raleway',
        fontWeight: 600,
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            height: 'calc(100% - 12px)',
            width: '2px',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            left: '-0px',
        },
    },
    viewSelectionButton: {
        color: 'white !important',
        textDecoration: 'none',
    },
    buttonDiv: {
        margin: 8,
        marginTop: 24,
        textAlign: 'center',
    },
}));
