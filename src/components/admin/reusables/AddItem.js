import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import { selection } from '../../masks/MaskDesigns';

const useStyles = makeStyles({
    cell: {
        paddingBottom: 8,
        paddingTop: 8,
    },
    addDesign: {
        width: 150,
    },
    addNum: {
        width: 50,
        paddingBottom: 8,
        marginTop: 6,
    },
    icon: {
        fontSize: '1.75rem',
        cursor: 'pointer',
    },
});

export default ({ addItem }) => {
    const classes = useStyles();
    const [design, setDesign] = useState('');
    const [XL, setXL] = useState(0);
    const [L, setL] = useState(0);
    const [M, setM] = useState(0);
    const [S, setS] = useState(0);
    const [XS, setXS] = useState(0);
    const [mouseHover, setMouseHover] = useState(false);

    const autocompleteOptions = useMemo(() => {
        return Object.keys(selection).map((item) => {
            return selection[item].color;
        });
    }, []);

    const total =
        parseInt(XL) + parseInt(L) + parseInt(M) + parseInt(S) + parseInt(XS);

    const handleAddItem = () => {
        let designRefined = design
            .split(' ')
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
        if (design.length && total) {
            addItem(designRefined, XL, L, M, S, XS, total);
            setDesign('');
            setXL(0);
            setL(0);
            setM(0);
            setS(0);
            setXS(0);
        }
    };

    const handleEnterPressed = (event) => {
        if (event.key === 'Enter') handleAddItem();
    };

    const processNum = (num) => {
        return Math.ceil(Math.abs(num));
    };

    const hoverStyles = useMemo(() => {
        return {
            row: {
                backgroundColor: mouseHover ? '#e8f0ff' : 'white',
                transition: 'all .3s',
            },
            add: {
                color: mouseHover ? 'green' : 'rgba(0,0,0,.5)',
                transition: 'all .3s',
            },
        };
    }, [mouseHover]);

    const renderCell = (callback, size) => {
        return (
            <TableCell
                onKeyPress={handleEnterPressed}
                className={classes.cell}
                align="center"
                scope="row"
            >
                <TextField
                    onChange={callback}
                    value={size ? size : ''}
                    type="tel"
                    className={classes.addNum}
                    inputProps={{ style: { textAlign: 'center' } }}
                />
            </TableCell>
        );
    };

    return (
        <TableRow
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
            className={classes.row}
            style={hoverStyles.row}
        >
            <TableCell className={classes.cell} scope="row">
                {/* Needed to use inputValue instead of just value
                At least for this version of Autocomplete */}
                <Autocomplete
                    freeSolo
                    options={autocompleteOptions}
                    inputValue={design}
                    onInputChange={(e, newValue) => setDesign(newValue)}
                    onKeyPress={handleEnterPressed}
                    renderInput={(params) => (
                        <TextField {...params} className={classes.addDesign} />
                    )}
                />
            </TableCell>
            {renderCell((e) => setXL(processNum(e.target.value) | 0), XL)}
            {renderCell((e) => setL(processNum(e.target.value) | 0), L)}
            {renderCell((e) => setM(processNum(e.target.value) | 0), M)}
            {renderCell((e) => setS(processNum(e.target.value) | 0), S)}
            {renderCell((e) => setXS(processNum(e.target.value) | 0), XS)}
            <TableCell className={classes.cell} align="center" scope="row">
                {total}
            </TableCell>
            <TableCell align="center">
                <AddIcon
                    className={classes.icon}
                    onClick={handleAddItem}
                    style={hoverStyles.add}
                />
            </TableCell>
        </TableRow>
    );
};
