import React, { useState, useEffect } from 'react';
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

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddItem from '../reusables/AddItem';
import ItemRow from '../reusables/ItemRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import BackToAdmin from '../reusables/BackToAdmin';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Timestamper from '../../misc/Timestamper';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 900,
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

const getItemAPI = keys.wholesaleItemAPI;
const putItemAPI = keys.wholesalePutAPI;
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default ({ match }) => {
    const [totals, setTotals] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [timestamp, setTimestamp] = useState('0');

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(getItemAPI, {
                    params: {
                        ID: match.params.id,
                    },
                });
                console.log(response.data);
                setTitle(response.data.Title);
                setTimestamp(response.data.Timestamp);
                delete response.data.Timestamp;
                delete response.data.Title;
                delete response.data.Completed;
                delete response.data.ID;
                delete response.data.Total;
                setData(response.data ? response.data : []);
                setTotals(calculateTotals(response.data));
                setLoading(false);
            } catch (error) {
                console.log(error);
                setData({});
                setLoading(false);
            }
        }
        fetchData();
    }, [match.params.id]);

    console.log(data);

    const updateNum = (color, size, amount, action) => {
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
    const addItem = (design, XL, L, M, S, XS, Total) => {
        // If data already exists, add to object, otherwise create new
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
    const removeItem = (design) => {
        let newData = data;
        delete newData[design];
        setData(newData);
        setTotals(calculateTotals(newData));
    };
    const handleSaveAndSubmit = async () => {
        const event = {
            ID: match.params.id,
            action: 'Save',
            data: data,
            Total: totals.all,
            timestamp: Timestamper().split('T').join(' ').slice(0, -6),
        };
        setTimestamp(event.timestamp);
        try {
            setSnackbarOpen(true);
            await axios.put(putItemAPI, event, header);
        } catch (error) {
            console.log(error);
        }
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

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.todoHeader}>
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    <BackToAdmin path="/wholesale" />
                    {title}
                </Typography>
            </CardContent>
            <p className={classes.caption}>
                *To Do <strong>WILL NOT</strong> be updated upon Save.
            </p>
            <p className={classes.caption}>Last updated on {timestamp}</p>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
            ) : (
                renderTable()
            )}
            <div className={classes.actions}>
                <Link to="/admin">
                    <Button color="primary" className={classes.button}>
                        Admin
                    </Button>
                </Link>
                <Button
                    onClick={handleSaveAndSubmit}
                    color="primary"
                    className={classes.button}
                >
                    Save
                </Button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                >
                    Wholesale Order has been saved!
                </Alert>
            </Snackbar>
        </Card>
    );
};
