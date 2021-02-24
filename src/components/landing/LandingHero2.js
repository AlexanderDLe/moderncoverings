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

    const Background = useMemo(() => {
        return {
            hima: require(`../../img/BagSetModelPhotos/lifestyleElephantEdit.jpg`),
            minnie: require(`../../img/BagSetModelPhotos/lifestyleMinnieEdit.jpg`),
            lovable: require(`../../img/BagSetModelPhotos/lifestyleLovableEdit.jpg`),
        };
    }, []);

    const renderCarouselItem = (index, bg_img) => {
        return (
            <Carousel.Item
                style={{
                    minHeight: navMediaQuery ? '50vh' : 300,
                    background: `url(${bg_img}) no-repeat center`,
                    backgroundColor: 'white',
                }}
                className={`carousel-item carousel-image-${index}`}
            ></Carousel.Item>
        );
    };

    return (
        <Carousel pause={false} active={index} onSelect={handleSelect}>
            {renderCarouselItem(1, Background.hima)}
            {renderCarouselItem(2, Background.minnie)}
            {renderCarouselItem(3, Background.lovable)}
        </Carousel>
    );
}

export default SelectionHero;
