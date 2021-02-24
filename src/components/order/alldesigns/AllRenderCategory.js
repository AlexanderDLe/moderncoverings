import React, { useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreMaskObj } from '../../../slices/appSlice';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import DesignCard from './DesignCard';

const DesignCard = lazy(() => import('./AllDesignCard'));

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
        fontSize: '1.6rem',
        cursor: 'pointer',
        fontWeight: '400',
        fontFamily: 'Open Sans',
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
    },
}));

const AllRenderCategory = ({
    categoryName,
    categoryItems,
    filterState,
    setYCoordinate,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showMoreMaskObj = useSelector((state) => state.app.showMoreMaskObj);
    const [categoryOpen, setCategoryOpen] = useState(true);

    // console.log(showMoreObj);

    const handleShowMoreButtonClick = () => {
        const newShowMoreMaskObj = { ...showMoreMaskObj };
        newShowMoreMaskObj[categoryName] = !newShowMoreMaskObj[categoryName];
        dispatch(setShowMoreMaskObj(newShowMoreMaskObj));
    };

    const renderCategory = (category) => {
        let itemsToShow;
        if (showMoreMaskObj[categoryName]) {
            itemsToShow = category.slice(0, 8);
        } else {
            itemsToShow = category;
        }
        return itemsToShow.map((design, index) => {
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
                    <Checkbox
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        checked={categoryOpen}
                        color="default"
                        className={classes.checkbox}
                        size="small"
                    />
                    <Typography
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        variant="h4"
                        component="h2"
                        className={classes.categoryTitle}
                    >
                        {categoryName}
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    {categoryOpen ? renderCategory(categoryItems) : ''}
                </Grid>
                {showMoreMaskObj[categoryName] &&
                categoryOpen &&
                categoryItems.length > 8
                    ? showMoreButton
                    : ''}
            </React.Fragment>
        );
    } else {
        return '';
    }
};

export default AllRenderCategory;
