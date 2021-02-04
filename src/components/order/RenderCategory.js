import React, { useState, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreMaskObj } from '../../slices/appSlice';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const DesignCard = lazy(() => import('./DesignCard'));

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
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showMoreMaskObj = useSelector(state => state.app.showMoreMaskObj);
    const [categoryOpen] = useState(true);

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
                    />
                </Suspense>
            );
        });
    };

    const showMoreButton = (
        <div className={classes.showMoreDiv}>
            <Button
                className={classes.showMoreButton}
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
                    <Typography
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
                {showMoreMaskObj[categoryName] &&
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
