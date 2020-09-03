import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    back: {
        color: 'rgba(0,0,0,.87)',
        marginRight: 16,
    },
});
export default ({ path }) => {
    const classes = useStyles();

    return (
        <Link to={path ? path : '/admin'}>
            <ArrowBackIcon className={classes.back} />
        </Link>
    );
};
