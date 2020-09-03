import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    statItem: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    color: {
        paddingTop: 6,
    },
});
export default ({ color, item, toggleDesign, bool }) => {
    const classes = useStyles();

    const [checked, setChecked] = useState(bool);

    return (
        <div className={classes.statItem}>
            <Typography className={classes.color} variant="body1">
                {color}
            </Typography>{' '}
            <Switch
                checked={checked}
                onChange={() => {
                    const initialCheck = checked;
                    setChecked(!checked);
                    toggleDesign(item, !initialCheck);
                }}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    );
};
