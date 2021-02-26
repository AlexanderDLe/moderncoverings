import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardsStyles, CardFlexStyles } from './CardsStyles';
import useMediaQueries from '../../utils/useMediaQueries';

interface Props {
    cardIMG: any;
    cardTitle: string;
    cardText: JSX.Element;
}

const Card = ({ cardIMG, cardTitle, cardText }: Props) => {
    const styles = CardsStyles();
    const min600px = useMediaQueries().min600px;
    const cardFlex = CardFlexStyles(min600px) as React.CSSProperties;

    return (
        <Grid className={styles.gridItem} item xs={12} sm={12} md={12}>
            <div className={styles.card} style={cardFlex}>
                <img
                    alt="Feature Icon"
                    src={cardIMG}
                    className={styles.cardIMG}
                />
                <div className={styles.cardContent}>
                    <Typography
                        className={styles.cardTitle}
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

export default Card;
