import React, { useEffect, Suspense, lazy, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import LandingHero from './LandingHero';
import LandingCopy from './LandingCopy';
const LandingCDC = lazy(() => import('./LandingAbout'));
const Cards = lazy(() => import('./Cards'));
const Testimonials = lazy(() => import('./Testimonials'));

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    fallback: {
        height: '100vh',
    },
    loading: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Landing = () => {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mediaQuery900 = useMediaQuery('(min-width:900px)');

    const queryStyles = useMemo(() => {
        return mediaQuery900
            ? {
                  sectionPadding: {
                      paddingTop: 48,
                      paddingBottom: 48,
                  },
                  sectionTitle: {
                      fontSize: '2rem',
                      paddingBottom: 12,
                  },
              }
            : {
                  sectionPadding: {
                      paddingTop: 24,
                      paddingBottom: 24,
                  },
                  sectionTitle: {
                      fontSize: '1.6rem',
                  },
              };
    }, [mediaQuery900]);

    return (
        <main className={classes.root}>
            <LandingHero queryStyles={queryStyles} />
            <LandingCopy queryStyles={queryStyles} />
            <Suspense fallback={<div className={classes.fallback} />}>
                <Cards />
                <Testimonials queryStyles={queryStyles} />
                <LandingCDC queryStyles={queryStyles} />
            </Suspense>
        </main>
    );
};

export default Landing;
