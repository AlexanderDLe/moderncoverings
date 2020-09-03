import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        // padding: 8,
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

function DesignCard({ design, setYCoordinate }) {
    const classes = useStyles();

    const handleLinkClick = () => {
        if (setYCoordinate) setYCoordinate(window.pageYOffset);
    };

    return (
        <Grid item xs={6} sm={4} md={3}>
            <Link
                onClick={handleLinkClick}
                className={classes.designName}
                to={`/all/${design.param}`}
            >
                <Card className={classes.root} elevation={1}>
                    <CardMedia
                        className={classes.media}
                        image={require(`../../../img/SmallMaskPhotos/${design.img}`)}
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
}

export default DesignCard;
