import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: '#fbfbfb',
        padding: theme.spacing(6),
    },
    footerLink: {
        color: 'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none',
    },
}));

function Copyright() {
    const classes = useStyles();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            CAFacemasks.com {new Date().getFullYear()} |{' '}
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
        </Typography>
    );
}

export default function Album() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                If you have any questions or concerns, please email
                contact@cafacemasks.com.
            </Typography>
            <br />
            <Copyright />
        </footer>
    );
}
