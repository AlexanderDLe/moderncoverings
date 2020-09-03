import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 188,
        transform: 'scale(1)',
        transition: 'transform 1s',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform .5s',
        },
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    colorTitle: {
        paddingTop: 16,
        paddingBottom: 0,
    },
    designName: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    text: {
        color: 'rgba(0,0,0,.65',
    },
});

function CustomCard() {
    const classes = useStyles();

    return (
        <Grid item xs={6} sm={4} md={3}>
            <Link className={classes.designName} to={`/custom`}>
                <Card className={classes.root}>
                    <CardContent className={classes.colorTitle}>
                        <Typography variant="h4" component="h2">
                            Custom
                        </Typography>
                        <Typography
                            className={classes.text}
                            variant="body1"
                            component="h2"
                        >
                            Use your own designs
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
}

export default CustomCard;
