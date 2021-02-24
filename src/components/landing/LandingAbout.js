import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import StoreBG from '../../img/LandingPhotos/Rock.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        width: '100%',
        background: `url(${StoreBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'rgb(250,250,255)',
        padding: 24,
        margin: 16,
        marginTop: 128,
        marginBottom: 128,
    },
    heroText: {
        fontSize: '1rem',
        marginBottom: 0,
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
        fontFamily: 'Raleway',
        paddingBottom: 24,
    },
}));

const LandingAbout = ({ queryStyles }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
                    About Us
                </Typography>
                <Typography
                    variant="caption"
                    align="center"
                    color="textSecondary"
                    paragraph
                    className={classes.heroText}
                >
                    We're a small family business providing premium face masks.
                    We value not only beautiful designs that look great, but
                    also quality in materials and production. From multi-layered
                    fabrics to plastic adjusters, your satisfaction is our
                    number one priority.
                </Typography>
            </Container>
        </div>
    );
};

export default LandingAbout;
