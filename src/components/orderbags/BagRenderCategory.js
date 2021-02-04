import React, { useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreBagObj } from '../../slices/appSlice';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const DesignCard = lazy(() => import('./BagDesignCard'));

const useStyles = makeStyles((theme) => ({
    category: {
        margin: '24px 0',
        marginTop: 24,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: '3rem',
        cursor: 'pointer',
        fontWeight: '400',
        fontFamily: 'Raleway',
        margin: '0 auto',
    },
    checkbox: {
        color: 'rgba(0, 0, 0, 0.87)',
        marginLeft: -10,
    },
    showMoreDiv: {
        textAlign: 'center',
        marginTop: 16,
    },
    showMoreButton: {
        borderRadius: 3,
        fontFamily: 'Raleway',
        fontWeight: 700,
    },
    break: {
        opacity: 0,
        paddingBottom: 64,
    },
}));

export default ({
    categoryName,
    categoryItems,
    filterState,
    setYCoordinate,
}) => {
    const classes = useStyles();
    const showMoreBagObj = useSelector(state => state.app.showMoreBagObj);
    const dispatch = useDispatch();
    const [categoryOpen] = useState(true);

    const handleShowMoreButtonClick = () => {
        const newShowMoreBagObj = { ...showMoreBagObj };
        newShowMoreBagObj[categoryName] = !newShowMoreBagObj[categoryName];
        dispatch(setShowMoreBagObj(newShowMoreBagObj));
    };

    const renderCategory = (category) => {
        let itemsToShow;
        if (showMoreBagObj[categoryName]) {
            itemsToShow = category.slice(0, 8);
        } else {
            itemsToShow = category;
        }
        console.log('itemsToShow', itemsToShow);
        return itemsToShow.map((design, index) => {
            console.log('design', design);
            return (
                <Suspense key={index} fallback={<div />}>
                    <DesignCard
                        design={design}
                        key={index}
                        setYCoordinate={setYCoordinate}
                    />
                </Suspense>
            );
        });
    };

    const showMoreButton = (
        <div className={classes.showMoreDiv}>
            <Button
                className={classes.showMoreButton}
                // variant="contained"
                size="medium"
                onClick={handleShowMoreButtonClick}
                elevation={0}
            >
                Show More
            </Button>
        </div>
    );

    if (
        (categoryItems.length > 0 && filterState === categoryName) ||
        (categoryItems.length > 0 && filterState === 'All')
    ) {
        return (
            <React.Fragment>
                <div className={classes.category}>
                    {/* <Checkbox
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        checked={categoryOpen}
                        color="default"
                        className={classes.checkbox}
                        size="small"
                    /> */}
                    <Typography
                        // onClick={() => setCategoryOpen(!categoryOpen)}
                        variant="h4"
                        component="h2"
                        align="center"
                        className={classes.categoryTitle}
                    >
                        {categoryName}
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    {categoryOpen ? renderCategory(categoryItems) : ''}
                </Grid>
                {showMoreBagObj[categoryName] &&
                categoryOpen &&
                categoryItems.length > 8
                    ? showMoreButton
                    : ''}
                <hr className={classes.break} />
            </React.Fragment>
        );
    } else {
        return '';
    }
};
