import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Wood from '../../img/Icons/BG1.jpg';
import GiftBG from '../../img/Icons/GiftBG.jpg';
import BannerPhoto from '../../img/ProductPhotos/BagSetPhotos/BannerPhoto.jpg';
import BannerPhoto2 from '../../img/ProductPhotos/BagSetPhotos/BannerPhoto2.jpg';
// import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    rootbg: {
        background: `url(${Wood})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        textAlign: 'center'
    },
    bagTextImage: {
        display: 'flex',
        alignItems: 'center',        
    },
    boxItem: {
        padding: 12
    },
    bagText: {
        textAlign: 'center',
        minHeight: 450,
        padding: 12
    },
    textContainer: {
        backgroundColor: 'white',
        margin: 'auto auto',
        minHeight: 450,
        background: `url(${GiftBG})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: '2.5rem',
        cursor: 'pointer',
        fontWeight: '600',
        fontFamily: 'Raleway',
        margin: '0 auto',
    },
    strike: {
        textDecorationLine: "line-through !important",
        color: 'red'
    },
    price: {
        margin: 8
    },
    banner: {
        width: '100%',
        maxWidth: 1200,
        // margin: '0 auto'
    }
}));


export default function BagTextImage() {
    const navMediaQuery = useMediaQuery('(min-width:650px)');
    const classes = useStyles();

    return (
        <div className={classes.rootbg}>
            {/* <Container> */}
            <img src={navMediaQuery ? BannerPhoto : BannerPhoto2} className={classes.banner} alt="Banner" />
            {/* </Container> */}
        </div>
    )
}
