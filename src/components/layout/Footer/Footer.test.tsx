import React from 'react';
import { Footer } from './Footer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Footer Test Suite', () => {
    beforeEach(() => {
        render(
            <Router>
                <Footer />
            </Router>
        );
    });

    test('Footer render', () => {
        let supportStr =
            'If you have any questions or concerns, please email contact@moderncoverings.com';

        let support = screen.getByText(supportStr);
        let faq = screen.getByText('FAQ');

        expect(support).toBeInTheDocument();
        expect(faq).toBeInTheDocument();
    });
});
