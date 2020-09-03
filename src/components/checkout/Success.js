import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 420,
        borderBottom: '2px solid #3f51b5',
    },
    link: {
        color: '#3f51b5',
        textDecoration: 'none',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    close: {
        padding: 8,
    },
    successHeader: {
        fontFamily: 'Open Sans',
    },
});

const Success = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent>
                <Typography
                    className={classes.successHeader}
                    variant="h4"
                    component="h2"
                >
                    Thank You
                </Typography>
            </CardContent>

            <CardContent style={{ paddingTop: 0, paddingBottom: 20 }}>
                Your order was successful. You will receive an Order Confirmation to the email you provided.
            </CardContent>
            <CardActions className={classes.itemActions}>
                <Button
                    style={{ display: 'block' }}
                    size="small"
                    color="primary"
                >
                    <Link to="/selection" className={classes.link}>
                        View Selection
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default Success;
