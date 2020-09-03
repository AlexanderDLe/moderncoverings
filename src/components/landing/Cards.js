import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import BlueBG from '../../img/BlueBG.jpg';
import LayersWhite from '../../img/LayersWhite.png';
import ReusableWhite from '../../img/ReusableWhite.png';
import ComfortWhite from '../../img/ComfortWhite.png';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    gridItem: {
        marginTop: 4,
        marginBottom: 8,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 8,
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 8,
        paddingTop: 80,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    cardMedia: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -108px)',
        backgroundColor: theme.palette.primary.main,
        height: '95px',
        width: '95px',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 10,
    },
    cardContent: {
        flexGrow: 1,
    },
    cardTitle: {
        fontFamily: 'Open Sans',
        textAlign: 'center',
    },
    cardText: {
        textAlign: 'center',
    },
}));

function Cards() {
    const classes = useStyles();

    const bgStyle = useMemo(() => {
        return {
            background: `#000 url(${BlueBG}) no-repeat center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
        };
    }, []);

    const cardText = useMemo(() => {
        return {
            multilayered: (
                <Typography className={classes.cardText} color="textSecondary">
                    Composed of <strong>4 layers</strong> of tightly-woven
                    cotton and polyester/rayon-blend filters. We prioritize
                    safety and health.
                </Typography>
            ),
            reusable: (
                <Typography className={classes.cardText} color="textSecondary">
                    Each contain{' '}
                    <strong>
                        retiable elastic ear bands and a metal nose wire
                    </strong>{' '}
                    so you can adjust for a comfortable fit.
                </Typography>
            ),
            comfortable: (
                <Typography className={classes.cardText} color="textSecondary">
                    Our <strong>carefully curated fabrics </strong>
                    are soft, easy to wear for extended periods, and allow for
                    ease of breathing.
                </Typography>
            ),
        };
    }, [classes.cardText]);

    const renderCard = (cardIMG, cardTitle, cardText) => {
        return (
            <Grid className={classes.gridItem} item xs={12} sm={12} md={4}>
                <div className={classes.card}>
                    <div
                        className={classes.cardMedia}
                        style={{ backgroundImage: `url(${cardIMG})` }}
                    ></div>
                    <div className={classes.cardContent}>
                        <Typography
                            className={classes.cardTitle}
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {cardTitle}
                        </Typography>
                        {cardText}
                    </div>
                </div>
            </Grid>
        );
    };

    return (
        <div style={bgStyle}>
            <div className="landing-cards-bg-overlay"></div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {renderCard(
                        LayersWhite,
                        'Multi-layered',
                        cardText.multilayered
                    )}
                    {renderCard(ReusableWhite, 'Adjustable', cardText.reusable)}
                    {renderCard(
                        ComfortWhite,
                        'Comfortable',
                        cardText.comfortable
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default Cards;
