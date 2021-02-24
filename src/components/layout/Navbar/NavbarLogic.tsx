import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export const HideOnScroll = (props: any) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

type Element = null | HTMLButtonElement;
type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export const HandleNavMenu = () => {
    const [anchorElement, setAnchorElement] = useState<Element>(null);

    const handleClick = (event: ClickEvent) => {
        setAnchorElement(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElement(null);
    };

    return { anchorElement, handleClick, handleClose };
};
