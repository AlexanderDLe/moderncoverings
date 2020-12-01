import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import ChristmasIcon from '../../img/Icons/ChristmasIcon.png';

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundColor: '#424242',
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
        height: 60,
        width: 'auto',
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
                <img alt="Flag" className={classes.flag} src={ChristmasIcon} />
            ) : (
                ''
            )}
            <div className={classes.textbox}>
                <p>
                    Use Code <strong>HOLIDAY15</strong> And Get 15% Off 45$+ Orders
                </p>
            </div>
            {navMediaQuery450 ? (
                <img alt="Flag" className={classes.flag} src={ChristmasIcon} />
            ) : (
                ''
            )}
        </div>
    );
}

export default Banner;
