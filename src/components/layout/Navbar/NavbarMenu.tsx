import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavMenuStyles } from './NavStyles';
import { HandleNavMenu } from './NavbarLogic';

const NavbarMenu: React.FC = () => {
    const classes = NavMenuStyles();
    const { anchorElement, handleClick, handleClose } = HandleNavMenu();

    const menuNavItem = (path: string, label: string) => (
        <MenuItem onClick={handleClose}>
            <Link to={`/${path}`} className={classes.menuItem}>
                {label}
            </Link>
        </MenuItem>
    );

    return (
        <React.Fragment>
            <IconButton data-test="login-input" onClick={handleClick}>
                <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Menu
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleClose}
            >
                {menuNavItem('selection/masks', 'Mask Selection')}
                {menuNavItem('selection/bags', 'Bag Set Selection')}
                {menuNavItem('faq', 'FAQ')}
                {menuNavItem('cart', 'Cart')}
            </Menu>
        </React.Fragment>
    );
};

export default NavbarMenu;
