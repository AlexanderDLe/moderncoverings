import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Logo from '../../img/LogoSmall.jpg';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 250,
        borderBottom: '2px solid #3f51b5',
        padding: 8,
        paddingBottom: 0,
    },
    header: {
        fontFamily: 'Open Sans',
    },
    todoHeader: {
        textAlign: 'center',
    },
    button: {
        borderWidth: '2px',
        width: '100%',
        border: 'none !important',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    link: {
        display: 'block',
    },
    logo: {
        width: '70%',
        height: 'auto',
        marginTop: -32,
        marginBottom: -16,
    },
});

export default ({ authenticated, setAuthenticated }) => {
    const classes = useStyles();

    const handleLogoutSubmit = () => {
        localStorage.removeItem('Authenticated');
        setAuthenticated(false);
    };

    if (!localStorage.getItem('Authenticated')) return <Redirect to="/login" />;

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.todoHeader}>
                <img
                    src={Logo}
                    className={classes.logo}
                    alt="CAfacemasks Logo"
                />
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    Admin
                </Typography>
                <hr />
                <Link className={classes.link} to="/total">
                    <Button color="primary" className={classes.button}>
                        Total
                    </Button>
                </Link>
                <Link className={classes.link} to="/daily">
                    <Button color="primary" className={classes.button}>
                        Daily
                    </Button>
                </Link>
                <Link className={classes.link} to="/wholesale">
                    <Button color="primary" className={classes.button}>
                        Wholesale
                    </Button>
                </Link>
                <Link className={classes.link} to="/designs">
                    <Button color="primary" className={classes.button}>
                        Designs
                    </Button>
                </Link>
                <Link className={classes.link} to="/todo">
                    <Button color="primary" className={classes.button}>
                        Todo
                    </Button>
                </Link>
                <hr />
                <Link to="/login">
                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={handleLogoutSubmit}
                    >
                        Logout
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
