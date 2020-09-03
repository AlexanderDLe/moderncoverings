import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        maxWidth: 345,
        borderRadius: 0,
        transform: 'scale(1)',
        transition: 'transform 1s',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform .5s',
        },
    },
    bestseller: {
        position: 'absolute',
        color: 'red',
        right: 8,
        top: 8,
        textAlign: 'center',
    },
    media: {
        height: 140,
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    designName: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    cardTextContent: {
        paddingTop: '8px !important',
        paddingBottom: '16px !important',
    },
    cardTitle: {
        textAlign: 'center',
    },
    placeholderText: {
        color: 'white',
    },
});

export default () => {
    const classes = useStyles();

    return (
        <Grid item xs={6} sm={4} md={3}>
            <Card className={classes.root} elevation={1}>
                <div className={classes.media}></div>
                <CardContent className={classes.cardTextContent}>
                    <Typography
                        className={classes.placeholderText}
                        variant="body1"
                        component="h2"
                    >
                        X
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
