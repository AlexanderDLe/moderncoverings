import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        overflow: 'hidden',
    },
    container: {
        padding: 8,
        zIndex: '100',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
    },
});
function SelectionHero() {
    const navMediaQuery = useMediaQuery('(min-width:900px)');
    const navMediaQuery535 = useMediaQuery('(min-width:535px)');
    const classes = useStyles();

    const landingImage = useMemo(() => {
        return navMediaQuery535
            ? {
                  img1: require(`../../img/LandingPhotos/LandingPhoto4.jpg`),
              }
            : {
                  img1: require(`../../img/LandingPhotos/LandingPhoto4.jpg`),
              };
    }, [navMediaQuery535]);

    const landingBG = useMemo(() => {
        return {
            minHeight: navMediaQuery ? '50vh' : 300,
            background: `#fff url(${landingImage.img1}) center / auto 100% no-repeat`,
        };
    }, [navMediaQuery, landingImage]);

    return (
        <div className={classes.root}>
            <div style={landingBG}></div>
        </div>
    );
}

export default SelectionHero;
