import React from 'react';
import Snackbar from './Snackbar';
import { render, cleanup } from '@testing-library/react';

describe('Snackbar Test Suite', () => {
    afterEach(cleanup);

    test('Snackbar renders.', () => {
        let propFn = jest.fn();
        const snackbar = render(
            <Snackbar onClose={propFn} snackbarOpen={true} />
        );
    });
});
