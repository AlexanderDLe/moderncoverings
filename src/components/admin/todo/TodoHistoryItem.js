import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

export default ({ data, index }) => {
    const classes = useStyles();

    return (
        <div className={classes.box}>
            <div>{data.text}</div>
            <div>{data.timestamp}</div>
        </div>
    );
};
