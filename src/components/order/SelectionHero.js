import React, { useState, useMemo } from 'react';
import { useMediaQuery } from '@material-ui/core';
import 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function SelectionHero() {
    const navMediaQuery = useMediaQuery('(min-width:900px)');
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const selectionImage = useMemo(() => {
        return {
            dotted: navMediaQuery
                ? require(`../../img/SelectionCarouselImages/SelfieImage.jpg`)
                : require(`../../img/SelectionCarouselImages/Phone_SelfieImage.jpg`),
            hawaiian: navMediaQuery
                ? require(`../../img/SelectionCarouselImages/SelfieImage2.jpg`)
                : require(`../../img/SelectionCarouselImages/Phone_SelfieImage2.jpg`),
            bandana: navMediaQuery
                ? require(`../../img/SelectionCarouselImages/SelfieImage3.jpg`)
                : require(`../../img/SelectionCarouselImages/Phone_SelfieImage3.jpg`),
        };
    }, [navMediaQuery]);

    const renderCarouselItem = (index, bg_img) => {
        return (
            <Carousel.Item
                style={{
                    minHeight: navMediaQuery ? 450 : 325,
                    background: `url(${bg_img}) no-repeat center`,
                }}
                className={`carousel-item carousel-image-${index}`}
            ></Carousel.Item>
        );
    };

    return (
        <Carousel pause={false} active={index} onSelect={handleSelect}>
            {renderCarouselItem(1, selectionImage.dotted)}
            {renderCarouselItem(2, selectionImage.hawaiian)}
            {renderCarouselItem(3, selectionImage.bandana)}
        </Carousel>
    );
}

export default SelectionHero;
