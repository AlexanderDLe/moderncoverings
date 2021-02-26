import React, { useEffect, Suspense, lazy } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { LandingStyles } from './LandingStyles';

import LandingHero from './LandingHero';
import LandingCopy from './LandingCopy';
const LandingCDC = lazy(() => import('./LandingAbout'));
const Cards = lazy(() => import('./LandingCards/Cards'));
const Testimonials = lazy(() => import('./Testimonials'));

const Landing = () => {
    const styles = LandingStyles();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mediaQuery900 = useMediaQuery('(min-width:900px)');

    const queryStyles = mediaQuery900
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

    return (
        <main className={styles.root}>
            <LandingHero queryStyles={queryStyles} />
            <LandingCopy queryStyles={queryStyles} />
            <Suspense fallback={<div className={styles.fallback} />}>
                <Cards />
                <Testimonials queryStyles={queryStyles} />
                <LandingCDC queryStyles={queryStyles} />
            </Suspense>
        </main>
    );
};

export default Landing;
