import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
// import BG1 from '../../img/Icons/BG1.jpg';
import BanPhot from '../../img/ProductPhotos/BagSetPhotos/BanPhot.jpg';
import BanPhot2 from '../../img/ProductPhotos/BagSetPhotos/BanPhot2.jpg';


const useStyles = makeStyles((theme) => ({
    rootbg: {
        // background: `url(${BG1})`,
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
    banner: {
        margin: "32px 8px",
        width: '85%',
        maxWidth: 750,
        boxShadow: "0px 3px 12px -7px rgba(0,0,0,.75)"
        // margin: '0 auto'
    }
}));


export default function BagTextImage() {
    const navMediaQuery = useMediaQuery('(min-width:650px)');
    const classes = useStyles();

    return (
        <div className={classes.rootbg}>
            {/* <Container> */}
            <img src={navMediaQuery ? BanPhot : BanPhot2} className={classes.banner} alt="Banner" />
            {/* </Container> */}
        </div>
    )
}
