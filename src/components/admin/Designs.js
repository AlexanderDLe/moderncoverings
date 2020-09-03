import React, { useEffect, useState } from 'react';
import keys from '../../config/keys';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selection } from '../masks/MaskDesigns';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackToAdmin from './reusables/BackToAdmin';
import DesignItem from './design/DesignItem';

const useStyles = makeStyles({
    root: {
        marginTop: 60,
        width: '100%',
        maxWidth: 300,
        borderBottom: '2px solid #3f51b5',
    },
    header: {
        fontFamily: 'Open Sans',
    },
    button: {
        borderWidth: '2px',
        border: 'none !important',
        padding: 16,
    },
});

const API = keys.designsAPI;
const header = {
    'Content-Type': 'application/json',
};

export default () => {
    const classes = useStyles();
    let [data, setData] = useState({});
    let [loading, setLoading] = useState(true);

    console.log(data);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setData({});
                setLoading(false);
            }
        }
        if (localStorage.getItem('Authenticated')) fetchData();
    }, []);

    const toggleDesign = async (design, bool) => {
        try {
            const newData = { ...data };
            newData.design = !newData.design;
            setData(newData);
            console.log(newData);
            await axios.post(API, { design, bool }, header);
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = (item, index) => {
        return (
            <DesignItem
                item={item}
                key={index}
                color={selection[item].color}
                bool={data[item]}
                toggleDesign={toggleDesign}
            />
        );
    };

    const renderData = () => {
        return Object.keys(selection)
            .sort()
            .map((item, index) => {
                return renderItem(item, index);
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
                    Designs
                </Typography>
            </CardContent>

            <CardContent style={{ paddingTop: 0, paddingBottom: 20 }}>
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    renderData()
                )}
                <hr />
            </CardContent>
            <Link to="/admin">
                <Button color="primary" className={classes.button}>
                    Admin
                </Button>
            </Link>
        </Card>
    );
};
