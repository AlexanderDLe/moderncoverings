import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/slices/AppSlice/appSlice';

import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import keys from '../../config/keys';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Logo from '../../img/LogoSmall.jpg';

const PIN = keys.PIN;

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 250,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
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
    },
    logo: {
        width: '70%',
        height: 'auto',
        marginTop: -32,
        marginBottom: -16,
    },
    PIN: {
        marginBottom: 16,
    },
    text: {
        color: 'rgba(0,0,0,.5)',
    },
}));

const Login = () => {
    const classes = useStyles();
    const authenticated = useSelector((state) => state.app.authenticated);
    const dispatch = useDispatch();

    const [pin, setPin] = useState('');

    const handleLoginSubmit = () => {
        if (pin === PIN) {
            dispatch(login());
        }
        setPin('');
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') handleLoginSubmit();
    };

    if (authenticated) return <Redirect to="/admin" />;

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.todoHeader}>
                <img
                    src={Logo}
                    className={classes.logo}
                    alt="Modern Coverings Logo"
                />
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    Login
                </Typography>
                <hr />
                <p className={classes.text}>Enter PIN</p>
                <TextField
                    onChange={(e) => setPin(e.target.value)}
                    onKeyPress={handleOnKeyPress}
                    value={pin}
                    type="password"
                    className={classes.PIN}
                    inputProps={{
                        style: { textAlign: 'center', fontSize: '1.5rem' },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleLoginSubmit}
                >
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default Login;
