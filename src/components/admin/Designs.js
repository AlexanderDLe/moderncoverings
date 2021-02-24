import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import keys from '../../config/keys';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selection as maskSelection } from '../designs/MaskDesigns';
import { selection as bagSelection } from '../designs/BagSets';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackToAdmin from './reusables/BackToAdmin';
import DesignItem from './design/DesignItem';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        marginBottom: 64,
        width: '100%',
        maxWidth: 300,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    header: {
        fontFamily: 'Open Sans',
    },
    button: {
        borderWidth: '2px',
        border: 'none !important',
        padding: 16,
    },
}));

const API = keys.designsAPI;
const header = {
    'Content-Type': 'application/json',
};

const Designs =  () => {
    const authenticated = useSelector(state => state.app.authenticated);

    const classes = useStyles();
    let [data, setData] = useState({});
    let [loading, setLoading] = useState(true);
    let [selection, setSelection] = useState({});

    console.log(data);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            try {
                const response = await axios.get(API);
                setSelection({...maskSelection, ...bagSelection});
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setData({});
                setLoading(false);
            }
        }
        if (authenticated) fetchData();
    }, [authenticated]);

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

export default Designs;