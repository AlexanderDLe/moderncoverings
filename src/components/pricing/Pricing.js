import React, { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: 8,
        marginTop: 40,
        marginBottom: 24,
        maxWidth: 400,
    },
    card: {
        borderBottom: '2px solid #3f51b5',
    },
    cardHeaderNormal: {
        textAlign: 'center',
        paddingTop: 0,
    },
    cardHeaderWholesale: {
        textAlign: 'center',
        paddingTop: 32,
    },
    normalButton: {
        borderTopLeftRadius: '0',
        width: '50%',
        border: 'none !important',
    },
    wholesaleButton: {
        borderWidth: '2px',
        borderTopRightRadius: '0',
        width: '50%',
        border: 'none !important',
    },
    dollarSign: {
        fontSize: '2rem',
        paddingTop: 16,
    },
    priceNum: {
        fontSize: '4.5rem',
    },
    each: {
        fontSize: '1.5rem',
        paddingTop: 50,
    },
}));

const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const classes = useStyles();
    const [pricingState, setPricingState] = useState('normal');

    const setPricingToNormal = () => {
        setPricingState('normal');
    };

    const setPricingToWholesale = () => {
        setPricingState('wholesale');
    };

    const normalPricingContent = (
        <React.Fragment>
            <CardContent style={{ paddingBottom: 0 }} className="price">
                <div className={classes.dollarSign}>$</div>
                <div className={classes.priceNum}>12.50</div>
                <div className={classes.each}>/mask</div>
            </CardContent>
            <CardHeader className={classes.cardHeaderNormal} title="Normal" />
            <CardContent className="price">
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                >
                    <strong>Free Shipping</strong> for all domestic (US) orders.
                    Typical delivery will be between 5-9 business days.
                    <br />
                    <br />
                    You can also purchase directly in-person at our shop at 2424
                    W Ball Rd, Suite D, Anaheim, CA 92804.
                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const wholesalePricingContent = (
        <React.Fragment>
            <CardHeader
                className={classes.cardHeaderWholesale}
                title="Wholesale"
            />
            <CardContent className="price">
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: 'left' }}
                >
                    Interested in buying in bulk? Please email
                    <strong> contact@moderncoverings.com</strong> to discuss
                    options.
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item>
                    <Card className={classes.card}>
                        {pricingState === 'normal'
                            ? normalPricingContent
                            : wholesalePricingContent}
                        <Button
                            color="primary"
                            className={classes.normalButton}
                            onClick={setPricingToNormal}
                        >
                            Normal
                        </Button>
                        <Button
                            color="primary"
                            className={classes.wholesaleButton}
                            onClick={setPricingToWholesale}
                        >
                            Wholesale
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Pricing;
