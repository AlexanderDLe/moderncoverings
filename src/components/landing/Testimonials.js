import React, { useMemo } from 'react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles((theme) => ({
    testimonialSection: {
        backgroundColor: '#fff',
        // padding: theme.spacing(6, 0, 6),
        // paddingBottom: 0,
    },
    sectionTitle: {
        fontFamily: 'Open Sans',
    },
    authorText: {
        fontSize: '1rem',
    },
    carouselContainer: {
        padding: 16,
        paddingTop: 0,
    },
    carouselProvider: {
        textAlign: 'center',
    },
    star: {
        color: 'gold',
        padding: 0,
    },
}));

function Carousel({ queryStyles }) {
    const classes = useStyles();

    const navMediaQuery580 = useMediaQuery('(min-width:580px)');
    const navMediaQuery500 = useMediaQuery('(min-width:500px)');
    const navMediaQuery400 = useMediaQuery('(min-width:400px)');
    const navMediaQuery320 = useMediaQuery('(min-width:320px)');

    const carouselHeight = useMemo(() => {
        return navMediaQuery580
            ? 45
            : navMediaQuery500
            ? 52
            : navMediaQuery400
            ? 75
            : navMediaQuery320
            ? 100
            : 110;
    }, [
        navMediaQuery580,
        navMediaQuery500,
        navMediaQuery400,
        navMediaQuery320,
    ]);

    const renderSlide = (text, author, index, paddingLen) => {
        return (
            <Slide className="slide" index={index}>
                <Typography
                    variant="caption"
                    align="center"
                    color="textSecondary"
                    paragraph
                    style={{
                        fontSize: `${navMediaQuery580 ? '1rem' : '.85rem'}`,
                        paddingTop: paddingLen,
                    }}
                >
                    "{text}"
                </Typography>
                <Typography
                    variant="caption"
                    align="center"
                    color="textSecondary"
                    paragraph
                    className={classes.authorText}
                >
                    - {author}
                </Typography>
                <div>
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                </div>
            </Slide>
        );
    };

    return (
        <div
            className={classes.testimonialSection}
            style={queryStyles.sectionPadding}
        >
            <Typography
                component="h2"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
                className={classes.sectionTitle}
                style={queryStyles.sectionTitle}
            >
                Testimonials
            </Typography>
            <Container className={classes.carouselContainer} maxWidth="sm">
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={carouselHeight}
                    totalSlides={4}
                    className={classes.carouselProvider}
                    interval={5000}
                    isPlaying={true}
                >
                    <Slider>
                        {renderSlide(
                            'I am very particular for buying masks for myself and family members so I have to search for a company who can provide good quality masks with reasonable prices. I found these masks able to provide what I’m looking for. I’m very happy once I tried it on. It fit my face snuggly and I can breathe with it. I encourage everyone to buy these masks.',
                            'Gina Le',
                            0,
                            0
                        )}
                        {renderSlide(
                            'I brought it home and my mom loved it and stole them from me. I had to get more! I like them. They’re comfortable, covers my face, and is not too heavy. I can breath easily through them. Would highly recommend.',
                            'Oscar Mejia',
                            1,
                            24
                        )}
                        {renderSlide(
                            'Just got my "bandana" pattern masks today, I\'m amazed at the quality for such a low price and highly recommend them. They\'re made here in California, I love that too, and took about 7 days between order and delivery. Thanks CA Facemasks.',
                            'Linda Garcini',
                            2,
                            24
                        )}
                        {renderSlide(
                            'Just got my mask in the mail today. Wow, very impressed with the quality. Thanks for making such a great mask.',
                            'Vicki Newell',
                            3,
                            48
                        )}
                    </Slider>
                    <ButtonBack className="slide-buttons">
                        <ChevronLeftIcon />
                    </ButtonBack>
                    <ButtonNext className="slide-buttons">
                        <ChevronRightIcon />
                    </ButtonNext>
                </CarouselProvider>
            </Container>
        </div>
    );
}

export default Carousel;
