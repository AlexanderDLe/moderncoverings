import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import '../styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';
import Analytics from 'react-router-ga';
import ReactPinterestTag from 'react-pinterest-tag';
import Body from './Body';
import keys from '../config/keys';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: 'GTM-MRHPV6X',
};

const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));
const Snackbar = lazy(() => import('./Snackbar'));

const options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
};

const App = () => {
    const mode = useSelector(state => state.app.mode);
    const [snackbarOpen, setSnackbarOpen] = useState(
        mode === 'sandbox' ? true : false
    );
    useEffect(() => {
        // PINTEREST TAG
        ReactPinterestTag.init(keys.pinterestID);
        // GOOGLE ANALYTICS
        ReactGA.initialize(keys.googleAnalyticsID, { debug: true });
        ReactGA.plugin.require('ec');
        // GOOGLE TAG MANAGER
        TagManager.initialize(tagManagerArgs);
        // FACEBOOK PIXEL
        if (mode === 'sandbox') return;
        ReactPixel.init(keys.pixelID, options);
    }, [mode]);
    const logReactPixelPurchase = (data) => {
        if (mode === 'sandbox') return;
        ReactPixel.track('Purchase', data);
    };

    return (
        <div>
            <CssBaseline />
            <Suspense fallback={<div />}>
                <Navbar/>
            </Suspense>
            <Analytics id={keys.googleAnalyticsID} debug>
                <Body
                    logReactPixelPurchase={logReactPixelPurchase}
                />
            </Analytics>
            <Suspense fallback={<div />}>
                <Snackbar
                    snackbarOpen={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                />
                <Footer />
            </Suspense>
        </div>
    );
};

export default App;
