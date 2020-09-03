import React, { useState, useMemo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FacemaskIcon from '../img/FacemaskIcon2.png';
import { useMediaQuery, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const navTextColor = 'black';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: '#fff',
    },
    title: {
        flexGrow: 1,
    },
    navIcon: {
        padding: 3,
        paddingTop: 8,
    },
    link: {
        color: `${navTextColor} !important`,
        textDecoration: 'none',
        fontFamily: 'Open Sans',
    },
    shoppingCartIcon: {
        fontSize: '1.2rem',
    },
    cartAmount: {
        marginLeft: '3px',
        color: navTextColor,
        textDecoration: 'none',
    },
    menuIcon: {
        color: navTextColor,
        display: 'block',
    },
    menuItem: {
        color: navTextColor,
        textDecoration: 'none',
    },
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = ({ amount }) => {
    const classes = useStyles();
    const navMediaQuery = useMediaQuery('(min-width:600px)');
    const navMediaQuery330 = useMediaQuery('(min-width:330px)');

    // Dynamic Nav Styles
    const dynamicStyles = useMemo(() => {
        return {
            navIconStyle: {
                width: `${navMediaQuery ? '50px' : '35px'}`,
                paddingBottom: 12,
                paddingRight: 4,
            },
            navTitleStyle: {
                fontSize: `${navMediaQuery ? '1.25rem' : '1rem'}`,
                fontFamily: 'Open Sans',
                fontWeight: 600,
                // textTransform: 'uppercase',
            },
            navItem: {
                marginRight: '20px',
            },
        };
    }, [navMediaQuery]);

    // Standard Navigation
    const fullNavItem = (path, label) => (
        <Link
            to={`/${path}`}
            className={classes.link}
            style={dynamicStyles.navItem}
        >
            {label}
        </Link>
    );
    const fullNav = (
        <React.Fragment>
            {fullNavItem('selection', 'Selection')}
            {fullNavItem('pricing', 'Pricing')}
            {fullNavItem('faq', 'FAQ')}
        </React.Fragment>
    );

    // Responsive/Mobile Menu Functionality
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Responsive/Mobile Navigation
    const menuNavItem = (path, label) => (
        <MenuItem onClick={handleClose}>
            <Link
                to={`/${path}`}
                className={classes.menuItem}
                style={dynamicStyles.navItem}
            >
                {label}
            </Link>
        </MenuItem>
    );
    const menuNav = (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuNavItem('selection', 'Selection')}
                {menuNavItem('pricing', 'Pricing')}
                {menuNavItem('faq', 'FAQ')}
                {menuNavItem('cart', 'Cart')}
            </Menu>
        </React.Fragment>
    );

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <AppBar className={classes.appbar}>
                    <Container>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                <Link
                                    style={dynamicStyles.navTitleStyle}
                                    className={classes.link}
                                    to="/"
                                >
                                    <img
                                        style={dynamicStyles.navIconStyle}
                                        className={classes.navIcon}
                                        src={FacemaskIcon}
                                        alt="Facemask Icon"
                                    />
                                    {navMediaQuery330 ? 'CA Facemasks' : ''}
                                </Link>
                            </Typography>

                            {navMediaQuery ? fullNav : menuNav}
                            <Link
                                to="/cart"
                                className={classes.link}
                                style={{ marginRight: '5px' }}
                            >
                                Cart
                            </Link>
                            <Link to="/cart" className={classes.link}>
                                <ShoppingCartIcon
                                    className={classes.shoppingCartIcon}
                                />
                            </Link>
                            <Link to="/cart" className={classes.cartAmount}>
                                {amount}
                            </Link>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        </div>
    );
};

export default Navbar;
