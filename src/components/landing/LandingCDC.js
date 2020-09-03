import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';

import StoreBG from '../../img/LandingPhotos/StoreBG.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        background: `url(${StoreBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        zIndex: -1,
        filter: 'blur(32px)',
    },
    bgImg: {
        width: '100%',
        position: 'relative',
    },
    spaceTop: {
        height: '40vh',
        maxHeight: 450,
    },
    container: {
        paddingBottom: 0,
    },
    heroContent: {
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        margin: '0 auto',
        width: '90%',
        maxWidth: '800px',
        backgroundColor: '#fff',
        padding: theme.spacing(6, 0, 6),
        paddingBottom: 0,
        // marginBottom: -144,
    },
    heroCaption: {
        fontSize: '1rem',
        fontWeight: 500,
        // marginBottom: 0,
    },
    heroCaption2: {
        fontSize: '.9rem',
        marginTop: 32,
        marginBottom: 0,
        // fontWeight: 600,
    },
    heroText: {
        fontSize: '1rem',
        marginBottom: 0,
        paddingBottom: 0,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    viewSelectionButton: {
        color: 'white !important',
        textDecoration: 'none',
    },
    learnMoreButton: {
        color: '#3f51b5',
        textDecoration: 'none',
    },
    sectionTitle: {
        fontFamily: 'Open Sans',
        paddingBottom: 24,
    },
}));

function LandingCTA({ queryStyles }) {
    const classes = useStyles();
    const mediaQuery900 = useMediaQuery('(min-width:900px)');
    const mediaQuery600 = useMediaQuery('(min-width:600px)');
    const mediaQuery365 = useMediaQuery('(min-width:365px)');
    const mediaQuery558 = useMediaQuery('(min-width:558px)');

    const bgImg = useMemo(() => {
        const img = mediaQuery600
            ? require(`../../img/LandingPhotos/WhiteLadyMask.jpg`)
            : require(`../../img/LandingPhotos/WhiteLadyMaskPhone.jpg`);

        return mediaQuery600
            ? {
                  background: `url(${img}) center / auto 100% no-repeat`,
              }
            : {
                  background: `url(${img})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
              };
    }, [mediaQuery600]);

    const bottomSpace = useMemo(() => {
        let height = mediaQuery900
            ? 200
            : mediaQuery558
            ? 172
            : mediaQuery365
            ? 200
            : 242;
        return { height: height, backgroundColor: 'white' };
    }, [mediaQuery365, mediaQuery558, mediaQuery900]);

    return (
        <div className={classes.root}>
            <div className={classes.overlay}></div>
            <div className={classes.bgImg} style={bgImg}>
                <div className={classes.spaceTop} />
                <div
                    className={classes.heroContent}
                    style={queryStyles.sectionPadding}
                >
                    <Container className={classes.container} maxWidth="sm">
                        <Typography
                            component="h2"
                            variant="h4"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            className={classes.sectionTitle}
                            style={queryStyles.sectionTitle}
                        >
                            CDC Recommended
                        </Typography>
                        <Typography
                            variant="caption"
                            align="center"
                            color="textSecondary"
                            paragraph
                            className={classes.heroText}
                        >
                            "
                            <strong>
                                The CDC recommends wearing cloth face coverings
                            </strong>{' '}
                            in public settings where other social distancing
                            measures are difficult to maintain..." in order to
                            slow the spread of infection.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                {/* <Grid item>
                            <Button variant="contained" color="primary">
                            <Link
                            to="/selection"
                            className={classes.viewSelectionButton}
                            >
                            Shop Now
                            </Link>
                            </Button>
                        </Grid> */}
                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>
            <div style={bottomSpace} />
        </div>
    );
}

export default LandingCTA;
