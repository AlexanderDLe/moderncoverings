import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import '../styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactPixel from 'react-facebook-pixel';
import Body from './Body';
import keys from '../config/keys';

const Navbar = lazy(() => import('./layout/Navbar/Navbar'));
const Footer = lazy(() => import('./layout/Footer/Footer'));
const Snackbar = lazy(() => import('./layout/Snackbar/Snackbar'));

const options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
};

const App = () => {
    const mode = useSelector((state) => state.app.mode);
    const [snackbarOpen, setSnackbarOpen] = useState(
        mode === 'sandbox' ? true : false
    );
    
    useEffect(() => {
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
                <Navbar />
            </Suspense>
            <Body logReactPixelPurchase={logReactPixelPurchase} />
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
