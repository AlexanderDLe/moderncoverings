import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import 'react-bootstrap';
import img from '../../img/LandingPhotos/LandingPhoto5.jpg';

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
const LandingHero = () => {
    const navMediaQuery = useMediaQuery('(min-width:900px)');
    const classes = useStyles();

    const landingBG = useMemo(() => {
        return {
            minHeight: navMediaQuery ? '50vh' : 300,
            background: `#f3dfd4 url(${img}) center / auto 100% no-repeat`,
        };
    }, [navMediaQuery]);

    return (
        <div className={classes.root}>
            <div style={landingBG}></div>
        </div>
    );
};

export default LandingHero;
