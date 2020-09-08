import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import BlueBG from '../../img/BlackWhiteBG.jpg';
import LayersPNG from '../../img/LayersColored.png';
import AdjustablePNG from '../../img/AdjustableColored.png';
import ComfortPNG from '../../img/ComfortColored.png';
import ReusablePNG from '../../img/ReusableColored.png';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 700,
        height: '100%',
        backgroundColor: 'white',
        margin: 8,
        padding: 16,
    },
    cardIMG: {
        height: 100,
        width: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cardMedia: {
        height: 'auto',
        width: '110px',
    },
    cardContent: {
        // paddingLeft: 24,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cardTitle: {
        fontFamily: 'Raleway',
        // textAlign: 'center',
    },
    cardText: {
        // textAlign: 'center',
    },
}));

function Cards() {
    const classes = useStyles();
    const navMediaQuery = useMediaQuery('(min-width:600px)');

    const bgStyle = useMemo(() => {
        return {
            background: `#000 url(${BlueBG}) no-repeat center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
        };
    }, []);

    // const cardStyle = navMediaQuery ? {} : {};
    const cardFlex = navMediaQuery
        ? {
              display: 'flex',
              flexDirection: 'row',
          }
        : {
              flexDirection: 'column',
              textAlign: 'center',
          };

    const cardText = useMemo(() => {
        return {
            multilayered: (
                <Typography className={classes.cardText} color="textSecondary">
                    Sewn with <strong>4 layers</strong> of tightly-woven cotton
                    and a blend of polyester/rayon filters. We always prioritize
                    quality.
                </Typography>
            ),
            adjustable: (
                <Typography className={classes.cardText} color="textSecondary">
                    Each mask includes{' '}
                    <strong>
                        plastic ear loop adjusters and a metal nose wire
                    </strong>{' '}
                    so you can adjust for a comfortable fit.
                </Typography>
            ),
            comfortable: (
                <Typography className={classes.cardText} color="textSecondary">
                    Our <strong>high quality fabrics </strong>
                    are soft-to-touch and easy to wear for long durations.
                </Typography>
            ),
            reusable: (
                <Typography className={classes.cardText} color="textSecondary">
                    All masks are <strong>reusable via proper washing</strong>.
                    We recommend washing with soap then hanging to air-dry.
                </Typography>
            ),
        };
    }, [classes.cardText]);

    const renderCard = (cardIMG, cardTitle, cardText) => {
        return (
            <Grid className={classes.gridItem} item xs={12} sm={12} md={12}>
                <div className={classes.card} style={cardFlex}>
                    {/* <div
                        className={classes.cardMedia}
                        style={{ backgroundImage: `url(${cardIMG})` }}
                    ></div> */}
                    <img
                        alt="Feature Icon"
                        src={cardIMG}
                        className={classes.cardIMG}
                    />
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
                        LayersPNG,
                        'Multi-layered',
                        cardText.multilayered
                    )}
                    {renderCard(
                        AdjustablePNG,
                        'Adjustable',
                        cardText.adjustable
                    )}
                    {renderCard(
                        ComfortPNG,
                        'Comfortable',
                        cardText.comfortable
                    )}
                    {renderCard(ReusablePNG, 'Reusable', cardText.reusable)}
                </Grid>
            </Container>
        </div>
    );
}

export default Cards;
