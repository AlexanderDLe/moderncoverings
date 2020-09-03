import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Flag from '../../img/Flag.png';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundColor: '#6868fd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    textbox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    flag: {
        paddingBottom: 16,
        boxShadow: 'none',
        fontSize: '1rem',
    },
}));

function Banner() {
    const classes = useStyles();
    const navMediaQuery450 = useMediaQuery('(min-width:450px)');
    const navMediaQuery600 = useMediaQuery('(min-width:600px)');

    const bannerStyle = useMemo(
        () => ({
            paddingTop: navMediaQuery600 ? 24 : 18,
            height: navMediaQuery600 ? 65 : 50,
        }),
        [navMediaQuery600]
    );

    return (
        <div className={classes.banner} style={bannerStyle}>
            {navMediaQuery450 ? (
                <img alt="Flag" className={classes.flag} src={Flag} />
            ) : (
                ''
            )}
            <div className={classes.textbox}>
                {/* <h5 style={bannerHeader}>Use Code 15OFF</h5> */}
                <p>
                    Use Code <strong>15OFF</strong> And Get 15% Off 45$+ Orders
                </p>
            </div>
            {navMediaQuery450 ? (
                <img alt="Flag" className={classes.flag} src={Flag} />
            ) : (
                ''
            )}
        </div>
    );
}

export default Banner;
