import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <p>
                If you have any questions or concerns, please email
                contact@moderncoverings.com
            </p>
            <br />
            <p>
                {'Copyright © '}
                ModernCoverings.com {new Date().getFullYear()} |{' '}
                <Link to="/policies" className={classes.footerLink}>
                    Policies
                </Link>{' '}
                |{' '}
                <Link to="/faq" className={classes.footerLink}>
                    FAQ
                </Link>{' '}
                <a
                    className={classes.footerLink}
                    href="https://www.paypal.com/us/webapps/mpp/ua/acceptableuse-full"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {' '}
                    | PayPal AUP
                </a>
            </p>
        </footer>
    );
};

export default Footer;
