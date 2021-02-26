import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                padding: 100,
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default Spinner;
