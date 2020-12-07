import React, { useState, useMemo } from 'react';
// import { useMediaQuery } from '@material-ui/core';
import 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function SelectionHero() {
    // const navMediaQuery = useMediaQuery('(min-width:900px)');
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const Background = useMemo(() => {
        return {
            fluorescent: require(`../../img/ProductPhotos/BagSetPhotos/FluorescentSet.jpg`),
            hima: require(`../../img/ProductPhotos/BagSetPhotos/HimaSet.jpg`),
            lovable: require(`../../img/ProductPhotos/BagSetPhotos/LovableSet.jpg`),
            minnie: require(`../../img/ProductPhotos/BagSetPhotos/MinnieSet.jpg`),
        };
    }, []);

    const renderCarouselItem = (index, bg_img) => {
        return (
            <Carousel.Item
                style={{
                    minHeight: 450,
                    background: `url(${bg_img}) no-repeat center`,
                    backgroundColor: 'white'
                }}
                className={`carousel-item carousel-image-${index}`}
            ></Carousel.Item>
        );
    };

    return (
        <Carousel pause={false} active={index} onSelect={handleSelect}>
            {renderCarouselItem(1, Background.lovable)}
            {renderCarouselItem(2, Background.minnie)}
            {renderCarouselItem(3, Background.hima)}
            {renderCarouselItem(4, Background.fluorescent)}
        </Carousel>
    );
}

export default SelectionHero;
