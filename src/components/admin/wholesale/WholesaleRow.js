import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    status: {
        cursor: 'pointer',
    },
    link: {
        color: 'rgba(0,0,0,.87)',
    },
    removalConfirmation: {
        position: 'absolute',
    },
    confirmBox: {
        padding: 16,
        paddingBottom: 0,
        backgroundColor: 'white',
        transform: 'translateY(-25%)',
        boxShadow: '0px 5px 8px -5px #888888',
    },
});

function WholesaleRow({
    index,
    id,
    data,
    handleUpdateCompleted,
    handleConfirmRemoval,
}) {
    const classes = useStyles();

    const [mouseHover, setMouseHover] = useState(false);
    const [removeConfirmation, setRemoveConfirmation] = useState(false);

    const handleConfirmRemovalClick = () => {
        setRemoveConfirmation(false);
        handleConfirmRemoval(id);
    };

    const renderRemovalConfirmation = () => {
        return (
            <div className={classes.confirmBox}>
                <p className={classes.confirmationText}>
                    Remove <strong>{data[id].Title}</strong>?
                </p>
                <Button
                    onClick={handleConfirmRemovalClick}
                    className={classes.yesButton}
                >
                    Yes
                </Button>
                <Button
                    onClick={() => setRemoveConfirmation(false)}
                    className={classes.noButton}
                >
                    No
                </Button>
            </div>
        );
    };

    return (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <Link className={classes.link} to={`/wholesale/${id}`}>
                    {data[id].Title}
                </Link>
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                {data[id].Total}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                {data[id].Timestamp}
            </TableCell>
            <TableCell align="center">
                <CheckIcon
                    onClick={() => handleUpdateCompleted(id)}
                    className={classes.status}
                    style={{
                        color: data[id].Completed ? '#55cc55' : '#cccccc',
                    }}
                />
            </TableCell>
            <TableCell align="center">
                <ClearIcon
                    onMouseEnter={() => setMouseHover(true)}
                    onMouseLeave={() => {
                        setMouseHover(false);
                    }}
                    onClick={() => setRemoveConfirmation(true)}
                    className={classes.status}
                    style={{
                        color: mouseHover ? 'red' : '#cccccc',
                    }}
                />
            </TableCell>
            <td className={classes.removalConfirmation}>
                {removeConfirmation ? renderRemovalConfirmation() : ''}
            </td>
        </TableRow>
    );
}

export default WholesaleRow;
