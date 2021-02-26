import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TitleStyles } from './TitleStyles';

const Title = ({ text }: { text: string }) => {
    const styles = TitleStyles();

    return (
        <CardContent className={styles.title}>
            <Typography
                className={styles.title}
                gutterBottom
                variant="h4"
                component="h2"
            >
                {text}
            </Typography>
        </CardContent>
    );
};

export default Title;
