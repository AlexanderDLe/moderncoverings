import React from 'react';
import { useDispatch } from 'react-redux';
import { setYCoordinateMask } from '../../state/slices/AppSlice/appSlice';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        maxWidth: 345,
        borderRadius: 0,
    },
    bestseller: {
        position: 'absolute',
        color: 'red',
        right: 8,
        top: 8,
        textAlign: 'center',
    },
    media: {
        height: 175,
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
}));

const DesignCard = ({ match, design }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLinkClick = () => {
        dispatch(setYCoordinateMask(window.pageYOffset));
    };

    const cardImage = require(`../../img/ProductPhotos/Small/${design.img}`)
        .default;

    return (
        <Grid item xs={6} sm={4} md={3}>
            <Link
                onClick={handleLinkClick}
                className={classes.designName}
                to={`/item/${design.param}`}
            >
                <Card className={classes.root} elevation={1}>
                    <CardMedia
                        className={classes.media}
                        image={cardImage}
                        title={design.color}
                    />
                    <CardContent className={classes.cardTextContent}>
                        <Typography
                            className={classes.cardTitle}
                            variant="body1"
                            component="h2"
                        >
                            {design.color}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

export default DesignCard;
