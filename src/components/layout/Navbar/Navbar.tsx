import React from 'react';
import { useTypedSelector } from '../../utils/useTypedSelector';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavbarStyles } from './NavStyles';
import { HideOnScroll } from './NavbarLogic';
import NavbarMenu from './NavbarMenu';

const Navbar: React.FC = () => {
    const classes = NavbarStyles();
    const amount = useTypedSelector((state) => state.cart.amount);

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <AppBar className={classes.appbar}>
                    <Container>
                        <Toolbar>
                            <Link className={classes.title} to="/">
                                MC
                            </Link>
                            <NavbarMenu />
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
