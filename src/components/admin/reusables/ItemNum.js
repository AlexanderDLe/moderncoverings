import React, { useState, useMemo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    icon: {
        fontSize: '1.25rem',
        position: 'relative',
        top: 4,
        cursor: 'pointer',
        transition: 'all .25s',
    },
    num: {
        fontSize: '1rem',
        display: 'inline',
        paddingLeft: 8,
        paddingRight: 8,
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
});

function TodoNum({ color, size, value, updateNum }) {
    const classes = useStyles();

    const [hovered, setHovered] = useState(false);

    const hoverStyles = useMemo(() => {
        return {
            remove: {
                color: hovered ? 'red' : 'rgba(0,0,0,0)',
                transform: hovered ? 'translateX(0px)' : 'translateX(8px)',
            },
            add: {
                color: hovered ? 'green' : 'rgba(0,0,0,0)',
                transform: hovered ? 'translateX(0px)' : 'translateX(-8px)',
            },
        };
    }, [hovered]);

    const handleRemoveButton = () => {
        updateNum(color, size, 1, 'remove');
    };
    const handleAddButton = () => {
        updateNum(color, size, 1, 'add');
    };

    return (
        <TableCell
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classes.numCell}
            align="center"
        >
            <RemoveIcon
                onClick={() => handleRemoveButton()}
                style={hoverStyles.remove}
                className={classes.icon}
            />
            <div className={classes.num}>{value ? value : 0}</div>
            <AddIcon
                onClick={() => handleAddButton()}
                style={hoverStyles.add}
                className={classes.icon}
            />
        </TableCell>
    );
}

export default TodoNum;
