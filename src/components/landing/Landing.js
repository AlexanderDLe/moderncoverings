import React, { useEffect, Suspense, lazy, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import LandingHero from './LandingHero';
import LandingCopy from './LandingCopy';
import BestSellers from './BestSellers';

const LandingCDC = lazy(() => import('./LandingCDC'));
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

export default () => {
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
                <LandingCDC queryStyles={queryStyles} />
                <Cards />
                <BestSellers queryStyles={queryStyles} />
                <Testimonials queryStyles={queryStyles} />
            </Suspense>
        </main>
    );
};
