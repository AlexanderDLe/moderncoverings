import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import keys from '../../config/keys';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackToAdmin from './reusables/BackToAdmin';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 400,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        marginTop: 64,
        marginBottom: 64,
    },
    header: {
        fontFamily: 'Open Sans',
    },
    statItem: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: '2px',
        border: 'none !important',
        padding: 16,
    },
}));

const API = keys.salesPerMaskAPI;

const Stats = () => {
    const authenticated = useSelector((state) => state.app.authenticated);
    const classes = useStyles();

    let [total, setTotal] = useState(0);
    let [stats, setStats] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                response.data.sort((a, b) =>
                    parseInt(a.Total) <= parseInt(b.Total) ? 1 : -1
                );
                const dataTotal = response.data.reduce(
                    (acc, data) => acc + parseInt(data.Total),
                    0
                );
                setStats(response.data);
                setTotal(dataTotal);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setStats([]);
                setTotal(0);
                setLoading(false);
            }
        }
        if (authenticated) fetchData();
    }, [authenticated]);

    const renderItem = (item, index) => {
        return (
            <div key={index} className={classes.statItem}>
                <Typography className={classes.color} variant="body1">
                    {item.Color}
                </Typography>{' '}
                <Typography className={classes.total} variant="body1">
                    {item.Total}
                </Typography>{' '}
            </div>
        );
    };

    const renderStats = () => {
        return stats.map((stat, index) => {
            return renderItem(stat, index);
        });
    };

    if (!authenticated) return <Redirect to="/login" />;

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent>
                <Typography
                    className={classes.header}
                    variant="h4"
                    component="h2"
                >
                    <BackToAdmin />
                    Total
                </Typography>
            </CardContent>

            <CardContent style={{ paddingTop: 0, paddingBottom: 20 }}>
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    renderStats()
                )}
                <hr />
                {renderItem({ Color: 'Total', Total: total })}
            </CardContent>
            <Link to="/admin">
                <Button color="primary" className={classes.button}>
                    Admin
                </Button>
            </Link>
        </Card>
    );
};

export default Stats;
