import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useTypedSelector } from './utils/useTypedSelector';

import '../styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactPixel, { Options } from 'react-facebook-pixel';
import Body from './Body';
import keys from '../config/keys';

const Navbar = lazy(() => import('./layout/Navbar/Navbar'));
const Footer = lazy(() => import('./layout/Footer/Footer'));
const Snackbar = lazy(() => import('./layout/Snackbar/Snackbar'));

const options: Options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
};

const App = () => {
    const mode = useTypedSelector((state) => state.app.mode);
    const [snackbarOpen, setSnackbarOpen] = useState(
        mode === 'sandbox' ? true : false
    );

    useEffect(() => {
        if (mode === 'sandbox') return;
        ReactPixel.init(keys.pixelID, undefined, options);
    }, [mode]);

    return (
        <div>
            <CssBaseline />
            <Suspense fallback={<div />}>
                <Navbar />
            </Suspense>
            <Body />
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
