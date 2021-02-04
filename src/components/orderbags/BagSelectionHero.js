import React, { useState, useMemo } from 'react';
import { useMediaQuery } from '@material-ui/core';
import 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function SelectionHero() {
    // const navMediaQuery = useMediaQuery('(min-width:900px)');
    const [index, setIndex] = useState(0);
    const navMediaQuery = useMediaQuery('(min-width:535px)');

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const Background = useMemo(() => {
        return {
            lovable: navMediaQuery
                ? require(`../../img/BagSetModelPhotos/studioLovableEdit.jpg`)
                : require(`../../img/BagSetModelPhotos/studioLovableEdit.jpg`),
            comicFanny: navMediaQuery
                ? require(`../../img/BagSetModelPhotos/studioComicFannyPhone.jpg`)
                : require(`../../img/BagSetModelPhotos/studioComicFannyPhone.jpg`),
            floral: navMediaQuery
                ? require(`../../img//BagSetModelPhotos/studioFloralPhone.jpg`)
                : require(`../../img//BagSetModelPhotos/studioFloralPhone.jpg`),
            minnieFanny: navMediaQuery
                ? require(`../../img//BagSetModelPhotos/studioMinnieFannyEdit.jpg`)
                : require(`../../img//BagSetModelPhotos/studioMinnieFannyEdit.jpg`),
            minnie: navMediaQuery
                ? require(`../../img//BagSetModelPhotos/studioMinnieEdit.jpg`)
                : require(`../../img//BagSetModelPhotos/studioMinnieEdit.jpg`),
        };
    }, [navMediaQuery]);

    const renderCarouselItem = (index, bg_img) => {
        return (
            <Carousel.Item
                style={{
                    minHeight: 450,
                    background: `url(${bg_img}) no-repeat center`,
                    backgroundColor: '#ebeff8'
                }}
                className={`carousel-item carousel-image-${index}`}
            ></Carousel.Item>
        );
    };

    return (
        <Carousel pause={false} active={index} onSelect={handleSelect}>
            {renderCarouselItem(1, Background.lovable)}
            {renderCarouselItem(2, Background.comicFanny)}
            {renderCarouselItem(3, Background.floral)}
            {renderCarouselItem(4, Background.minnieFanny)}
            {renderCarouselItem(4, Background.minnie)}
        </Carousel>
    );
}

export default SelectionHero;
