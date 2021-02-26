import { makeStyles } from '@material-ui/core/styles';

export const LandingStyles = makeStyles({
    root: {
        width: '100%',
    },
    fallback: {
        height: '100vh',
    },
    loading: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
