import React from 'react';
import keys from '../../../config/keys';
import { Provider } from 'react-redux';
import Navbar from './Navbar';
import NavbarMenu from './NavbarMenu';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { store } from '../../../state';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Test Suite', () => {
    afterEach(cleanup);

    test('Navbar renders.', () => {
        const navbar = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Navbar />
                </Provider>
            </BrowserRouter>
        );

        if (keys.mode === 'sandbox') navbar.getByText('3');
        if (keys.mode === 'production') navbar.getByText('0');
    });

    test('Navmenu works.', () => {
        const navMenu = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Navbar>
                        <NavbarMenu />
                    </Navbar>
                </Provider>
            </BrowserRouter>
        );

        let { container } = navMenu;
        let navMenuIcon = container.querySelector('[data-test="login-input"]');
        fireEvent.click(navMenuIcon as Node);

        navMenu.getByText(/Mask Selection/);
        navMenu.getByText(/Bag Set Selection/);
        navMenu.getByText(/FAQ/);
        navMenu.getAllByText(/Cart/);
    });
});
