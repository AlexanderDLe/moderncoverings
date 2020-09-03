import React, { useEffect, useState, useMemo } from 'react';
import keys from '../../config/keys';
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
import moment from 'moment-timezone';
import TextField from '@material-ui/core/TextField';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackToAdmin from './reusables/BackToAdmin';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 600,
        borderBottom: '2px solid #3f51b5',
        padding: 8,
        paddingBottom: 0,
    },
    header: {
        fontFamily: 'Open Sans',
    },
    totalNum: {
        fontFamily: 'Open Sans',
        // fontSize: '1.3rem',
    },
    dailyHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: '2px',
        border: 'none !important',
        padding: 16,
    },
    fromDate: {
        width: 140,
    },
    toDate: {
        width: 140,
    },
    DateText: {
        padding: 16,
        position: 'relative',
        top: '2px',
        display: 'inline',
        fontSize: '1.1rem',
    },
    dateRangeBox: {
        paddingBottom: 32,
    },
    totalBox: {
        paddingBottom: 0,
    },
});

const calculateTimestamp = () => {
    let timestamp = moment().tz('America/Los_Angeles').format().toString();
    const date = timestamp.split('T')[0];
    return date;
};

const API = keys.dailiesMasksAPI;

// let testData = [
//     {
//         Color: 'Paws',
//         XL: 1,
//         L: 1,
//         M: 0,
//         S: 0,
//         XS: 0,
//         Total: 2,
//     },
//     {
//         Color: 'Black',
//         XL: 0,
//         L: 1,
//         M: 2,
//         S: 0,
//         XS: 3,
//         Total: 6,
//     },
//     {
//         Color: 'White',
//         XL: 1,
//         L: 0,
//         M: 1,
//         S: 0,
//         XS: 1,
//         Total: 3,
//     },
// ];

const calculateTotals = (data) => {
    let totals = {
        XL: 0,
        L: 0,
        M: 0,
        S: 0,
        XS: 0,
        all: 0,
    };
    for (let color of data) {
        totals.all += parseInt(color.Total);
        if (color.XL) totals.XL += parseInt(color.XL);
        if (color.L) totals.L += parseInt(color.L);
        if (color.M) totals.M += parseInt(color.M);
        if (color.S) totals.S += parseInt(color.S);
        if (color.XS) totals.XS += parseInt(color.XS);
    }
    return totals;
};

const fillDateRange = (fromDate, toDate) => {
    console.log('From: ', fromDate);
    console.log('To: ', toDate);
    var dateArray = [];
    var currentDate = moment(fromDate);
    toDate = moment(toDate);
    while (currentDate <= toDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
        currentDate = moment(currentDate).add(1, 'days');
    }
    let dateString = '';
    dateArray.forEach((date) => (dateString = dateString + date + ','));
    return dateString;
};

export default () => {
    const [dailyTotal, setDailyTotal] = useState(0);
    const [totals, setTotals] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fromDate, setFromDate] = useState(calculateTimestamp());
    const [toDate, setToDate] = useState(calculateTimestamp());
    const dateRange = useMemo(() => {
        return fillDateRange(fromDate, toDate);
    }, [fromDate, toDate]);
    console.log(dateRange);

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                setLoading(true);
                console.log('Date Range', dateRange);
                const response = await axios.get(API, {
                    params: {
                        dates: dateRange,
                    },
                });
                console.log(response);
                setDailyTotal(response.data.total ? response.data.total : 0);
                setData(response.data.payload ? response.data.payload : []);
                console.log(response.data.payload);
                setTotals(calculateTotals(response.data.payload));
                setLoading(false);
            } catch (error) {
                console.log(error);
                setDailyTotal(0);
                setData([]);
                setTotals({});
                setLoading(false);
            }
        }
        if (localStorage.getItem('Authenticated')) fetchData();
    }, [dateRange]);

    // Date Range Changes
    const onFromDateChange = (e) => {
        setFromDate(e.target.value);
    };
    const onToDateChange = (e) => {
        setToDate(e.target.value);
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
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .sort((a, b) =>
                                parseInt(a.Total) <= parseInt(b.Total) ? 1 : -1
                            )
                            .map((row) => (
                                <TableRow key={row.Color}>
                                    <TableCell component="th" scope="row">
                                        {row.Color}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.XL ? row.XL : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.L ? row.L : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.M ? row.M : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.S ? row.S : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.XS ? row.XS : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.Total}
                                    </TableCell>
                                </TableRow>
                            ))}
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
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    if (!localStorage.getItem('Authenticated')) return <Redirect to="/login" />;

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.dailyHeader}>
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    <BackToAdmin />
                    Daily
                </Typography>
            </CardContent>
            <CardContent className={classes.totalBox}>
                <Typography
                    className={classes.totalNum}
                    variant="h5"
                    component="h2"
                >
                    Total: ${Math.round(dailyTotal * 100) / 100}
                </Typography>
            </CardContent>
            <CardContent className={classes.dateRangeBox}>
                <div>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={fromDate}
                        className={classes.fromDate}
                        onChange={(e) => onFromDateChange(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <p className={classes.DateText}>To</p>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={toDate}
                        className={classes.toDate}
                        onChange={(e) => onToDateChange(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </CardContent>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
            ) : (
                renderTable()
            )}
            <Link to="/admin">
                <Button color="primary" className={classes.button}>
                    Admin
                </Button>
            </Link>
        </Card>
    );
};
