import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import DesignCard from './DesignCard';
import CustomCard from './CustomCard';
import { selection } from '../masks/MaskDesigns';
import Search from './Search';
import RenderCategory from './RenderCategory';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
    },
    smallContainer: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    root: {
        minHeight: 'calc(100vh - 630px)',
    },
    category: {
        margin: '24px 0',
        marginTop: 48,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: '1.8rem',
        cursor: 'pointer',
        fontWeight: '400',
        fontFamily: 'Open Sans',
    },
    checkbox: {
        color: 'rgba(0, 0, 0, 0.87)',
        marginLeft: -10,
    },
    sectionTitle: {
        fontFamily: 'Open Sans',
    },
    controlBox: {
        marginTop: 24,
        display: 'flex',
        justifyContent: 'space-between',
    },
    LoadingDiv: {
        height: '100vh',
    },
}));

function SelectionContainer({
    selectionPadding,
    searchTerm,
    handleSearchTermChange,
    showMoreObj,
    setShowMoreObj,
    yCoordinate,
    setYCoordinate,
    filter,
    solid,
    patriot,
    bandana,
    pattern,
    animal,
    hawaiian,
    floral,
    shield,
    customOpen,
    setCustomOpen,
}) {
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, yCoordinate);
    }, [yCoordinate]);

    // Render
    const renderDesigns = () => {
        const renderCustom = () => {
            const renderCustomItems = () => {
                return (
                    <React.Fragment>
                        <CustomCard />
                        <DesignCard
                            design={selection.blackelastic}
                            key={1000}
                            setYCoordinate={setYCoordinate}
                        />
                        <DesignCard
                            design={selection.whiteelastic}
                            key={1001}
                            setYCoordinate={setYCoordinate}
                        />
                    </React.Fragment>
                );
            };
            return (
                <React.Fragment>
                    <div className={classes.category}>
                        <Checkbox
                            onClick={() => setCustomOpen(!customOpen)}
                            checked={customOpen}
                            color="default"
                            className={classes.checkbox}
                            size="small"
                        />
                        <Typography
                            onClick={() => setCustomOpen(!customOpen)}
                            variant="h4"
                            component="h2"
                            className={classes.categoryTitle}
                        >
                            Custom
                        </Typography>
                    </div>
                    <Grid container spacing={2}>
                        {customOpen ? renderCustomItems() : ''}
                    </Grid>
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <RenderCategory
                    categoryName={'Bandana'}
                    categoryItems={bandana}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Floral'}
                    categoryItems={floral}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Animal'}
                    categoryItems={animal}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Pattern'}
                    categoryItems={pattern}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Solid'}
                    categoryItems={solid}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Hawaiian'}
                    categoryItems={hawaiian}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Patriot'}
                    categoryItems={patriot}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <RenderCategory
                    categoryName={'Shield'}
                    categoryItems={shield}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                {filter === 'All' || filter === 'Custom' ? renderCustom() : ''}
            </React.Fragment>
        );
    };

    return (
        <Container className={classes.root} style={selectionPadding}>
            <Search
                searchTerm={searchTerm}
                handleSearchTermChange={handleSearchTermChange}
            />
            {renderDesigns()}
        </Container>
    );
}

export default SelectionContainer;
