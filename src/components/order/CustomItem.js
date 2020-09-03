import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        borderBottom: '2px solid #3f51b5',
        paddingBottom: 8,
        margin: 16,
    },
    media: {
        height: 280,
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5',
    },
    buttonLink: {
        textDecoration: 'none',
        color: 'white',
    },
    customizeBox: {
        paddingTop: 26,
        display: 'flex',
    },
    itemActions: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 0,
    },
}));

function CustomItem() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    Custom Facemasks
                </Typography>
                <p>
                    Would you like to have facemasks with your own designs?
                    Bring or send your favorite fabric and we'll create them for
                    you. Send an email to Contact@CAFacemasks.com or visit our
                    shop at:
                </p>
                <p>
                    <br />
                    2424 W Ball Rd, Unit D
                    <br />
                    Anaheim, CA 92804.
                </p>
            </CardContent>

            <CardActions className={classes.itemActions}>
                <Button size="small" color="primary">
                    <Link to="/selection" className={classes.link}>
                        Back To Selections
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
}

export default CustomItem;
