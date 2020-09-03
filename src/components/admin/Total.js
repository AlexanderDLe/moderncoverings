import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 400,
        borderBottom: '2px solid #3f51b5',
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
});

const API = keys.salesPerMaskAPI;

// let myData = [
//     {
//         Color: 'Paws',
//         Total: '10',
//     },
//     {
//         Color: 'Artisan Black',
//         Total: '4',
//     },
//     {
//         Color: 'Terrace',
//         Total: '4',
//     },
//     {
//         Color: 'Violet Red Zebra',
//         Total: '2',
//     },
//     {
//         Color: 'Patriot',
//         Total: '3',
//     },
//     {
//         Color: 'Pink Bandana',
//         Total: '3',
//     },
//     {
//         Color: 'Floral Rose',
//         Total: '1',
//     },
//     {
//         Color: 'Zebra',
//         Total: '1',
//     },
//     {
//         Color: 'Navy Bandana',
//         Total: '6',
//     },
//     {
//         Color: 'Radiant',
//         Total: '2',
//     },
//     {
//         Color: 'Canopy',
//         Total: '1',
//     },
//     {
//         Color: 'Buttercup',
//         Total: '1',
//     },
//     {
//         Color: 'Blossom',
//         Total: '1',
//     },
//     {
//         Color: 'Sky',
//         Total: '3',
//     },
//     {
//         Color: 'Flames',
//         Total: '2',
//     },
//     {
//         Color: 'Koi',
//         Total: '5',
//     },
//     {
//         Color: 'Orange Plaid',
//         Total: '1',
//     },
//     {
//         Color: 'Bloom',
//         Total: '1',
//     },
//     {
//         Color: 'Leopard',
//         Total: '5',
//     },
//     {
//         Color: 'Tribal',
//         Total: '6',
//     },
//     {
//         Color: 'Palms',
//         Total: '2',
//     },
//     {
//         Color: 'Vines',
//         Total: '1',
//     },
//     {
//         Color: 'Black Dotted',
//         Total: '2',
//     },
//     {
//         Color: 'White Bandana',
//         Total: '3',
//     },
//     {
//         Color: 'Black',
//         Total: '12',
//     },
//     {
//         Color: 'Celeste',
//         Total: '1',
//     },
//     {
//         Color: 'Dark Grey',
//         Total: '4',
//     },
//     {
//         Color: 'White Dotted',
//         Total: '1',
//     },
//     {
//         Color: 'Ash',
//         Total: '2',
//     },
//     {
//         Color: 'Navy Grey',
//         Total: '6',
//     },
//     {
//         Color: 'Native',
//         Total: '1',
//     },
//     {
//         Color: 'Floral Green',
//         Total: '1',
//     },
//     {
//         Color: 'Magnetic',
//         Total: '2',
//     },
//     {
//         Color: 'Hula',
//         Total: '2',
//     },
//     {
//         Color: 'Spring',
//         Total: '5',
//     },
//     {
//         Color: 'Floral Pink',
//         Total: '1',
//     },
//     {
//         Color: 'River',
//         Total: '3',
//     },
//     {
//         Color: 'Garden',
//         Total: '4',
//     },
//     {
//         Color: 'Floral Burgundy',
//         Total: '2',
//     },
//     {
//         Color: 'Floral White',
//         Total: '7',
//     },
//     {
//         Color: 'Purple Plaid',
//         Total: '1',
//     },
//     {
//         Color: 'Sutra',
//         Total: '1',
//     },
//     {
//         Color: 'Cherries',
//         Total: '1',
//     },
//     {
//         Color: 'Minnie',
//         Total: '2',
//     },
//     {
//         Color: 'White',
//         Total: '2',
//     },
//     {
//         Color: 'Blue Bandana',
//         Total: '4',
//     },
//     {
//         Color: 'Artisan Red',
//         Total: '1',
//     },
//     {
//         Color: 'Black Bandana',
//         Total: '7',
//     },
//     {
//         Color: 'Loft',
//         Total: '1',
//     },
//     {
//         Color: 'Pink',
//         Total: '4',
//     },
//     {
//         Color: 'Floral Blue',
//         Total: '5',
//     },
//     {
//         Color: 'Stem',
//         Total: '1',
//     },
//     {
//         Color: 'Beach',
//         Total: '4',
//     },
//     {
//         Color: 'Navy Blue',
//         Total: '8',
//     },
//     {
//         Color: 'Grey',
//         Total: '5',
//     },
//     {
//         Color: 'Surf',
//         Total: '4',
//     },
//     {
//         Color: 'Pond',
//         Total: '2',
//     },
//     {
//         Color: 'Sunset',
//         Total: '5',
//     },
// ];

const Stats = () => {
    // myData.sort((a, b) => (parseInt(a.Total) <= parseInt(b.Total) ? 1 : -1));
    // let tot = myData.reduce((acc, data) => acc + parseInt(data.Total), 0);
    // console.log(tot);
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
        if (localStorage.getItem('Authenticated')) fetchData();
    }, []);
    const classes = useStyles();
    // console.log(stats, setStats);

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

    if (!localStorage.getItem('Authenticated')) return <Redirect to="/login" />;

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
