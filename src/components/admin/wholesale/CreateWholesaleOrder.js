import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import keys from '../../../config/keys';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import AddItem from '../reusables/AddItem';
import ItemRow from '../reusables/ItemRow';
import TextField from '@material-ui/core/TextField';

import BackToAdmin from '../reusables/BackToAdmin';
import Timestamper from '../../misc/Timestamper';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 850,
        borderBottom: '2px solid #3f51b5',
        padding: 8,
        paddingBottom: 0,
    },
    header: {
        fontFamily: 'Open Sans',
    },
    todoHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: '2px',
        border: 'none !important',
        padding: 16,
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    totalError: {
        color: 'red',
        paddingTop: 20,
    },
    caption: {
        fontSize: '.9rem',
        paddingLeft: 16,
        color: 'rgba(0,0,0,.7)',
    },
});

const API = keys.wholesalePutAPI;
const header = {
    'Content-Type': 'application/json',
};

const calculateTotals = (data) => {
    let totals = {
        XL: 0,
        L: 0,
        M: 0,
        S: 0,
        XS: 0,
        all: 0,
    };
    Object.keys(data).forEach((item) => {
        totals.all += parseInt(data[item].Total);
        if (data[item].XL) totals.XL += parseInt(data[item].XL);
        if (data[item].L) totals.L += parseInt(data[item].L);
        if (data[item].M) totals.M += parseInt(data[item].M);
        if (data[item].S) totals.S += parseInt(data[item].S);
        if (data[item].XS) totals.XS += parseInt(data[item].XS);
    });
    return totals;
};

export default () => {
    const [totals, setTotals] = useState({});
    const [data, setData] = useState({});
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [totalError, setTotalError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    console.log(data);

    const updateNum = async (color, size, amount, action) => {
        let newData = data;
        if (action === 'add') {
            newData[color][size] += amount;
            newData[color]['Total'] += amount;
        } else if (action === 'remove') {
            if (newData[color][size] - amount < 0) return;
            newData[color][size] -= amount;
            newData[color]['Total'] -= amount;
            if (newData[color]['Total'] === 0) {
                delete newData[color];
            }
        }
        setData(newData);
        setTotals(calculateTotals(newData));
    };
    const addItem = async (design, XL, L, M, S, XS, Total) => {
        // If data already exists, add to object, otherwise create new
        setTotalError(false);
        let newData = { ...data };
        if (newData[design]) {
            newData[design].XL += XL;
            newData[design].L += L;
            newData[design].M += M;
            newData[design].S += S;
            newData[design].XS += XS;
            newData[design].Total += Total;
        } else {
            newData[design] = { Color: design, XL, L, M, S, XS, Total };
        }

        console.log('Item added');
        setData(newData);
        setTotals(calculateTotals(newData));
    };
    const removeItem = async (design) => {
        let newData = data;
        delete newData[design];
        setData(newData);
        setTotals(calculateTotals(newData));
    };
    const handleSaveAndSubmit = async () => {
        if (!title) return setTitleError(true);
        if (!totals.all) return setTotalError(true);
        setLoading(true);
        const event = {
            id: Date.now().toString(),
            title: title,
            data: data,
            timestamp: Timestamper().split('T').join(' ').slice(0, -6),
        };
        try {
            await axios.post(API, event, header);
            setSaved(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (title.length > 0) setTitleError(false);
    };

    const renderTable = () => {
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Design</TableCell>
                            <TableCell align="center">XL</TableCell>
                            <TableCell align="center">L</TableCell>
                            <TableCell align="center">M</TableCell>
                            <TableCell align="center">S</TableCell>
                            <TableCell align="center">XS</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AddItem addItem={addItem} />
                        {Object.keys(data).map((row, index) => {
                            if (data[row].Total === 0)
                                return <TableRow key={index} />;
                            return (
                                <ItemRow
                                    key={row}
                                    updateNum={updateNum}
                                    data={data}
                                    row={row}
                                    removeItem={removeItem}
                                    rowBGColor={
                                        index % 2 === 1
                                            ? '#fff'
                                            : 'rgb(245,245,245)'
                                    }
                                />
                            );
                        })}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <strong>All</strong>
                            </TableCell>
                            <TableCell align="center">{totals.XL}</TableCell>
                            <TableCell align="center">{totals.L}</TableCell>
                            <TableCell align="center">{totals.M}</TableCell>
                            <TableCell align="center">{totals.S}</TableCell>
                            <TableCell align="center">{totals.XS}</TableCell>
                            <TableCell align="center">
                                <strong>{totals.all}</strong>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    if (saved) return <Redirect to="/wholesale" />;

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.todoHeader}>
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    <BackToAdmin path="/wholesale" />
                    Create Wholesale
                </Typography>
                <TextField
                    value={title}
                    onChange={handleTitleChange}
                    id="standard-basic"
                    label="Wholesale Order Title"
                    error={titleError}
                    autoComplete="off"
                />
            </CardContent>
            <p className={classes.caption}>
                *To Do <strong>WILL</strong> be updated upon Save & Submit.
            </p>
            {renderTable()}
            <div className={classes.actions}>
                <Link to="/admin">
                    <Button color="primary" className={classes.button}>
                        Admin
                    </Button>
                </Link>
                {totalError ? (
                    <p className={classes.totalError}>Order is empty.</p>
                ) : (
                    ''
                )}
                {loading ? (
                    ''
                ) : (
                    <Button
                        onClick={handleSaveAndSubmit}
                        color="primary"
                        className={classes.button}
                    >
                        Save & Submit
                    </Button>
                )}
            </div>
            {loading ? <LinearProgress /> : ''}
        </Card>
    );
};
