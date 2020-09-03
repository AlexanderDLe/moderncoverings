import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import ItemNum from './ItemNum';
import TableCell from '@material-ui/core/TableCell';
import ClearIcon from '@material-ui/icons/Clear';
import FallbackImage from '../../../img/Logo.jpg';

const useStyles = makeStyles({
    designName: {
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 500,
    },
    row: {
        position: 'relative',
    },
    icon: {
        width: 50,
        fontSize: '1.5rem',
        transition: 'all .3s',
        cursor: 'pointer',
        marginTop: 6,
    },
    test: {
        position: 'absolute',
    },
    imgBox: {
        backgroundColor: 'white',
        transform: 'translateY(-25%)',
        boxShadow: '0px 5px 8px -5px #888888',
    },
    confirmationBox: {
        backgroundColor: 'white',
        transform: 'translateY(10%)',
        boxShadow: '0px 5px 8px -5px #888888',
    },
    confirmationText: {
        padding: 16,
        margin: 0,
    },
    yesButton: {
        width: '50%',
    },
    noButton: {
        width: '50%',
    },
    total: {
        fontSize: '1rem',
    },
});

function TodoRow({
    data,
    row,
    updateNum,
    handleModalOpen,
    removeItem,
    rowBGColor,
}) {
    const classes = useStyles();
    const [mouseHover, setMouseHover] = useState(false);
    const [removeConfirmation, setRemoveConfirmation] = useState(false);

    const hoverStyles = useMemo(() => {
        return {
            row: {
                backgroundColor: mouseHover ? '#e8f0ff' : rowBGColor,
                transition: 'all .3s',
            },
            design: {
                fontWeight: mouseHover ? 500 : 400,
                transition: 'all .3s',
            },
            icon: {
                color: mouseHover ? 'red' : 'rgba(0,0,0,.5)',
                // transform: mouseHover ? 'translateX(0px)' : 'translateX(-20px)',
            },
        };
    }, [mouseHover, rowBGColor]);

    const handleRemoveClick = () => {
        if (removeConfirmation) {
            setRemoveConfirmation(false);
            removeItem(
                row,
                data[row].XL,
                data[row].L,
                data[row].M,
                data[row].S,
                data[row].XS,
                data[row].Total
            );
        } else {
            setRemoveConfirmation(true);
        }
    };

    const renderHelper = () => {
        const IMGFilename = row.split(' ').join('');
        let src;
        try {
            src = require(`../../../img/SmallMaskPhotos/${IMGFilename}.jpg`);
        } catch (error) {
            src = FallbackImage;
        }
        return (
            <div>
                {removeConfirmation ? (
                    <div className={classes.confirmationBox}>
                        <div>
                            <p className={classes.confirmationText}>
                                Remove <strong>{row}</strong>?
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className={classes.imgBox}>
                        <img
                            className={classes.img}
                            src={src}
                            alt="Mask"
                            style={{ width: '100%', padding: 0 }}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <TableRow
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => {
                setMouseHover(false);
                setRemoveConfirmation(false);
            }}
            className={classes.row}
            key={row}
            style={hoverStyles.row}
        >
            <TableCell
                className={classes.designName}
                component="th"
                scope="row"
                onClick={() => handleModalOpen(row)}
                style={hoverStyles.design}
            >
                {row}
            </TableCell>
            <ItemNum
                updateNum={updateNum}
                color={row}
                size="XL"
                value={data[row].XL}
            />
            <ItemNum
                updateNum={updateNum}
                color={row}
                size="L"
                value={data[row].L}
            />
            <ItemNum
                updateNum={updateNum}
                color={row}
                size="M"
                value={data[row].M}
            />
            <ItemNum
                updateNum={updateNum}
                color={row}
                size="S"
                value={data[row].S}
            />
            <ItemNum
                updateNum={updateNum}
                color={row}
                size="XS"
                value={data[row].XS}
            />
            <TableCell className={classes.total} align="center">
                {data[row].Total}
            </TableCell>
            <TableCell align="center">
                <ClearIcon
                    className={classes.icon}
                    style={hoverStyles.icon}
                    onClick={() => handleRemoveClick()}
                />
            </TableCell>
            <td className={classes.test}>{mouseHover ? renderHelper() : ''}</td>
        </TableRow>
    );
}

export default TodoRow;
