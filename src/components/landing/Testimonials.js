import React, { useMemo } from 'react';
import {
    CarouselProvider,
    Slider,
    Slide,
    // ButtonBack,
    // ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles((theme) => ({
    testimonialSection: {
        backgroundColor: 'rgb(250,250,255)',
    },
    sectionTitle: {
        fontFamily: 'Raleway',
    },
    authorText: {
        fontSize: '1rem',
    },
    carouselContainer: {
        padding: 16,
        paddingTop: 16,
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
            ? 30
            : navMediaQuery500
            ? 35
            : navMediaQuery400
            ? 50
            : navMediaQuery320
            ? 80
            : 90;
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
                {/* <div>
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                    <StarRateIcon className={classes.star} />
                </div> */}
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
                Reviews
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
                            'I had to let you know how much I love my mask. This is the first mask I’ve warn that doesn’t make my face feel like it’s in a sauna. I’ve tried other masks that are made with moisture wicking fabric but all that does is keep the mask dry and my face wet. Gross. And they aren’t as pretty as your masks are!',
                            'Lisa Chopard',
                            0,
                            0
                        )}
                        {renderSlide(
                            'I received my masks I ordered. I wanted to let you know I love them !! I’ve ordered other masks before but yours are the best. I’ve had recommended to others & I will purchase more in the future. They are the best !!',
                            'Mary Morrow',
                            1,
                            24
                        )}
                        {renderSlide(
                            'Just wanted to let you know I received my masks and I absolutely love them....the looks, the quality, the comfort, and the speed of which they got here. Thank you.',
                            'Cindy Jiricek',
                            2,
                            32
                        )}
                        {renderSlide(
                            `Thank you so much! I've tried lots of masks and yours are my favorite! I love that they are very structured, have many layers, and so many colors/styles from which to choose! I find them so comfortable! This is my 2nd order! Thanks again!`,
                            'Diane Richards',
                            3,
                            16
                        )}
                    </Slider>
                    {/* <ButtonBack className="slide-buttons">
                        <ChevronLeftIcon />
                    </ButtonBack>
                    <ButtonNext className="slide-buttons">
                        <ChevronRightIcon />
                    </ButtonNext> */}
                </CarouselProvider>
            </Container>
        </div>
    );
}

export default Carousel;
