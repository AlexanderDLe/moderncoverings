import React from 'react';
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
        // border: '1px solid black',
        // transform: 'scale(1)',
        // transition: 'transform 1s',
        // '&:hover': {
        //     transform: 'scale(1.05)',
        //     transition: 'transform .5s',
        // },
    },
    bestseller: {
        position: 'absolute',
        color: 'red',
        right: 8,
        top: 8,
        textAlign: 'center',
    },
    media: {
        height: 150,
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
        // color: 'white',
        // backgroundColor: theme.palette.primary.main,
        paddingTop: '8px !important',
        paddingBottom: '16px !important',
    },
    cardTitle: {
        fontFamily: 'Raleway !impowrtant',
        // fontWeight: 600,
        // fontSize: '1.1rem',
        textAlign: 'center',
    },
    placeholderText: {
        color: 'white',
    },
}));

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
                to={`/item/${design.param}`}
            >
                <Card className={classes.root} elevation={1}>
                    <CardMedia
                        className={classes.media}
                        image={require(`../../img/MaskPhotos/SmallMaskPhotos/${design.img}`)}
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
                        {/* <Typography
                            className={classes.cardTitle}
                            variant="body1"
                            component="h2"
                        >
                            {design.type === 'Mask' ? (
                                <span
                                    style={{
                                        color: 'rgba(0,0,0,.45)',
                                    }}
                                >
                                    ${design.price}
                                </span>
                            ) : (
                                ''
                            )}
                        </Typography> */}
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
}

export default DesignCard;
