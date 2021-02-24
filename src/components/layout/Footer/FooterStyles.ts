import { makeStyles } from '@material-ui/core/styles';

export const FooterStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: 'rgb(42,42,42)',
        padding: theme.spacing(6),
        color: 'rgba(255, 255, 255, 0.85) !important',
        textAlign: 'center',
    },
    footerLink: {
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.85) !important',
    },
}));
