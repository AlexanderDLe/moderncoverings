import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CardsStyles } from './CardsStyles';
import Card from './Card';

import LayersPNG from '../../../img/Icons/LayersColored.png';
import AdjustablePNG from '../../../img/Icons/AdjustableColored.png';
import ComfortPNG from '../../../img/Icons/ComfortColored.png';
import ReusablePNG from '../../../img/Icons/ReusableColored.png';

const Cards = () => {
    const styles = CardsStyles();

    const cardText = {
        multilayered: (
            <Typography color="textSecondary">
                Sewn with <strong>4 layers</strong> of tightly-woven cotton and
                a blend of polyester/rayon layers. We always prioritize quality.
            </Typography>
        ),
        adjustable: (
            <Typography color="textSecondary">
                Each mask includes{' '}
                <strong>
                    plastic ear loop adjusters and a metal nose wire
                </strong>{' '}
                so you can adjust for a comfortable fit.
            </Typography>
        ),
        comfortable: (
            <Typography color="textSecondary">
                Our <strong>high quality fabrics </strong>
                are soft-to-touch and easy to wear for long durations.
            </Typography>
        ),
        reusable: (
            <Typography color="textSecondary">
                All masks are <strong>reusable via proper washing</strong>. We
                recommend washing with soap then hanging to air-dry.
            </Typography>
        ),
    };

    return (
        <div className={styles.bgStyles}>
            <div className="landing-cards-bg-overlay"></div>
            <Container className={styles.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    <Card
                        cardIMG={LayersPNG}
                        cardTitle="Multi-layered"
                        cardText={cardText.multilayered}
                    />
                    <Card
                        cardIMG={AdjustablePNG}
                        cardTitle="Adjustable"
                        cardText={cardText.adjustable}
                    />
                    <Card
                        cardIMG={ComfortPNG}
                        cardTitle="Comfortable"
                        cardText={cardText.comfortable}
                    />
                    <Card
                        cardIMG={ReusablePNG}
                        cardTitle="Reusable"
                        cardText={cardText.reusable}
                    />
                </Grid>
            </Container>
        </div>
    );
};

export default Cards;
