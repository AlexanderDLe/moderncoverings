import React, { useEffect, useState } from 'react';
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
import Modal from '@material-ui/core/Modal';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddItem from './reusables/AddItem';
import TodoRow from './reusables/TodoRow';

import FallbackImage from '../../img/Logo.jpg';
import BackToAdmin from './reusables/BackToAdmin';
import Timestamper from '../misc/Timestamper';

import TodoHistory from './todo/TodoHistory';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 900,
        borderBottom: '2px solid #3f51b5',
        padding: 8,
        paddingBottom: 0,
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
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '1080px',
        backgroundColor: 'white',
        border: '2px solid #000',
    },
    innerModal: {
        position: 'relative',
        padding: 0,
        margin: 0,
    },
    modalTitle: {
        textAlign: 'center',
        paddingBottom: 16,
    },
    totals: {
        fontSize: '1rem',
    },
    timestamp: {
        fontSize: '1rem',
        color: 'rgba(0,0,0,.6)',
        marginTop: 8,
    },
    showMoreDiv: {
        textAlign: 'center',
        marginTop: 16,
    },
    showMoreButton: {
        borderRadius: 3,
    },
});

const API = keys.todoMasksAPI;
const designAPI = keys.designsAPI;
const historyAPI = keys.todoHistoryAPI;
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
    const [designAvailability, setDesignAvailability] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('Black');
    const [timestamp, setTimestamp] = useState('');
    const [historyArr, setHistoryArr] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // Modal Stuff
    const handleModalOpen = (design) => {
        setModalImage(design);
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const renderModalContent = () => {
        const IMGFilename = modalImage.split(' ').join('');
        let src;
        try {
            src = require(`../../img/PostMaskPhotos/${IMGFilename}.jpg`);
        } catch (error) {
            src = FallbackImage;
        }
        return (
            <div className={classes.modal}>
                <div className={classes.innerModal}>
                    <img
                        src={src}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FallbackImage;
                        }}
                        alt="Mask"
                        onClick={handleModalClose}
                        style={{ width: '100%', padding: 0 }}
                    />
                    <Typography
                        className={classes.modalTitle}
                        variant="h4"
                        component="h2"
                    >
                        {modalImage}
                    </Typography>
                </div>
            </div>
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                const designResponse = await axios.get(designAPI);
                const historyResponse = await axios.get(historyAPI);
                setDesignAvailability(designResponse.data);
                console.log(designResponse.data);
                console.log(response.data);
                console.log(historyResponse.data);
                setData(response.data ? response.data : []);
                setHistoryArr(historyResponse.data.history);
                setTotals(calculateTotals(response.data));
                setTimestamp(Timestamper().split('T').join(' ').slice(0, -9));
                setLoading(false);
            } catch (error) {
                console.log(error);
                setData([]);
                setHistoryArr([]);
                setTotals({});
                setLoading(false);
            }
        }
        if (localStorage.getItem('Authenticated')) fetchData();
    }, []);
    const classes = useStyles();

    const toggleDesign = async (design, bool) => {
        console.log('ey');
        if (designAvailability[design] === undefined) return;
        try {
            // const newDesignAvailability = { ...designAvailability };
            // newDesignAvailability.design = !newDesignAvailability.design;
            // setData(newDesignAvailability);
            // console.log(newDesignAvailability);
            await axios.post(designAPI, { design, bool }, header);
        } catch (error) {
            console.log(error);
        }
    };

    const updateNum = async (color, size, amount, action) => {
        let newData = data;
        const updateHistoryEntry = () => {
            let str = '';
            if (action === 'add') str += `Added ${color}: +1 ${size}.`;
            if (action === 'remove') str += `Removed ${color}: -1 ${size}.`;
            return str;
        };
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
        try {
            const event = {
                color,
                data: [
                    {
                        size,
                        amount,
                        action,
                    },
                ],
                timestamp: Timestamper().split('T').join(' ').slice(0, -6),
            };
            setData(newData);
            setTotals(calculateTotals(newData));
            const newHistoryArr = [...historyArr];
            newHistoryArr.unshift({
                text: updateHistoryEntry(),
                timestamp: Timestamper().split('T').join(' ').slice(0, -6),
            });
            if (newHistoryArr.length > 15) newHistoryArr.pop();
            setHistoryArr(newHistoryArr);
            await axios.post(API, event, header);
        } catch (error) {
            console.log(error);
        }
    };
    const addItem = async (design, XL, L, M, S, XS, Total) => {
        const addAction = (size, amount) => {
            return {
                size: size,
                action: 'add',
                amount: amount,
            };
        };
        const addHistoryEntry = () => {
            let str = `Added ${design}: `;
            if (XL) str += `+${XL} XL. `;
            if (L) str += `+${L} L. `;
            if (M) str += `+${M} M. `;
            if (S) str += `+${S} S. `;
            if (XS) str += `+${XS} XS. `;
            return str;
        };
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
        let event = {
            color: design,
            data: [],
            timestamp: Timestamper().split('T').join(' ').slice(0, -6),
        };

        if (XL > 0) event.data.push(addAction('XL', XL));
        if (L > 0) event.data.push(addAction('L', L));
        if (M > 0) event.data.push(addAction('M', M));
        if (S > 0) event.data.push(addAction('S', S));
        if (XS > 0) event.data.push(addAction('XS', XS));

        try {
            console.log('Item added');
            setData(newData);
            setTotals(calculateTotals(newData));
            const newHistoryArr = [...historyArr];
            newHistoryArr.unshift({
                text: addHistoryEntry(),
                timestamp: Timestamper().split('T').join(' ').slice(0, -6),
            });
            if (newHistoryArr.length > 15) newHistoryArr.pop();
            setHistoryArr(newHistoryArr);
            await axios.post(API, event, header);
        } catch (error) {
            console.log(error);
        }
    };
    const removeItem = async (design, XL, L, M, S, XS, Total) => {
        const removeAction = (size, amount) => {
            return {
                size: size,
                action: 'remove',
                amount: amount,
            };
        };
        const removeHistoryEntry = () => {
            let str = `Removed ${design}: `;
            if (XL) str += `-${XL} XL. `;
            if (L) str += `-${L} L. `;
            if (M) str += `-${M} M. `;
            if (S) str += `-${S} S. `;
            if (XS) str += `-${XS} XS. `;
            return str;
        };
        let newData = data;

        let event = {
            color: design,
            data: [],
            timestamp: Timestamper().split('T').join(' ').slice(0, -6),
        };
        if (XL > 0) event.data.push(removeAction('XL', XL));
        if (L > 0) event.data.push(removeAction('L', L));
        if (M > 0) event.data.push(removeAction('M', M));
        if (S > 0) event.data.push(removeAction('S', S));
        if (XS > 0) event.data.push(removeAction('XS', XS));
        try {
            delete newData[design];
            setData(newData);
            setTotals(calculateTotals(newData));
            const newHistoryArr = [...historyArr];
            newHistoryArr.unshift({
                text: removeHistoryEntry(),
                timestamp: Timestamper().split('T').join(' ').slice(0, -6),
            });
            if (newHistoryArr.length > 15) newHistoryArr.pop();
            setHistoryArr(newHistoryArr);
            await axios.post(API, event, header);
        } catch (error) {
            console.log(error);
        }
    };
    const renderTable = () => {
        const renderTableCell = (name) => {
            return (
                <TableCell className={classes.totals} align="center">
                    {name}
                </TableCell>
            );
        };
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.totals}>
                                Design
                            </TableCell>
                            {renderTableCell('XL')}
                            {renderTableCell('L')}
                            {renderTableCell('M')}
                            {renderTableCell('S')}
                            {renderTableCell('XS')}
                            {renderTableCell('Total')}
                            {renderTableCell('Actions')}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AddItem addItem={addItem} />
                        {Object.keys(data).map((row, index) => {
                            let str = row.split(' ').join('').toLowerCase();
                            if (data[row].Total === 0)
                                return <TableRow key={index} />;
                            return (
                                <TodoRow
                                    key={row}
                                    updateNum={updateNum}
                                    data={data}
                                    row={row}
                                    handleModalOpen={handleModalOpen}
                                    removeItem={removeItem}
                                    rowBGColor={
                                        index % 2 === 1
                                            ? '#fff'
                                            : 'rgb(245,245,245)'
                                    }
                                    availability={designAvailability[str]}
                                    toggleDesign={toggleDesign}
                                    disabled={
                                        designAvailability[str] === undefined
                                    }
                                />
                            );
                        })}
                        <TableRow>
                            <TableCell
                                className={classes.totals}
                                component="th"
                                scope="row"
                            >
                                <strong>All</strong>
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                {totals.XL}
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                {totals.L}
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                {totals.M}
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                {totals.S}
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                {totals.XS}
                            </TableCell>
                            <TableCell
                                className={classes.totals}
                                align="center"
                            >
                                <strong>{totals.all}</strong>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    if (!localStorage.getItem('Authenticated')) return <Redirect to="/login" />;

    return (
        <React.Fragment>
            <Card className={classes.root} elevation={3}>
                <CardContent className={classes.todoHeader}>
                    <Typography
                        className={classes.header}
                        variant="h4"
                        component="h2"
                    >
                        <BackToAdmin />
                        To Do
                    </Typography>
                    <p className={classes.timestamp}>
                        {!loading ? 'Retrieved data on ' : ''} {timestamp}
                    </p>
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
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="Mask Image"
                    aria-describedby="Modal to pop up facemask image."
                >
                    {renderModalContent()}
                </Modal>
            </Card>
            {showHistory ? <TodoHistory historyArr={historyArr} /> : ''}
            <div className={classes.showMoreDiv}>
                <Button
                    className={classes.showMoreButton}
                    size="medium"
                    onClick={() => setShowHistory(!showHistory)}
                    elevation={0}
                >
                    {showHistory ? 'Hide ' : 'Show '}
                    History
                </Button>
            </div>
        </React.Fragment>
    );
};
