import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import DesignCard from './DesignCard';
import { selection } from '../../designs/MaskDesigns';
import Search from './Search';
import RenderCategory from './RenderCategory';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        paddingBottom: 32,
    },
    smallContainer: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    root: {
        minHeight: 'calc(100vh - 630px)',
        backgroundColor: 'rgb(250,250,255)',
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

const SelectionContainer = ({
    selectionPadding,
    searchTerm,
    handleSearchTermChange,
    filter,
    solid,
    patriot,
    bandana,
    pattern,
    animal,
    hawaiian,
    holiday,
    floral,
    shield,
    customOpen,
    setCustomOpen,
}) => {
    const classes = useStyles();
    const yCoordinateMask = useSelector((state) => state.app.yCoordinateMask);

    useEffect(() => {
        window.scrollTo(0, yCoordinateMask);
    }, [yCoordinateMask]);

    // Render
    const renderDesigns = () => {
        const renderCustom = () => {
            const renderCustomItems = () => {
                return (
                    <React.Fragment>
                        {/* <CustomCard /> */}
                        <DesignCard
                            design={selection.blackelastic}
                            key={1000}
                        />
                        <DesignCard
                            design={selection.whiteelastic}
                            key={1001}
                        />
                    </React.Fragment>
                );
            };
            return (
                <React.Fragment>
                    <div className={classes.category}>
                        <Typography
                            onClick={() => setCustomOpen(!customOpen)}
                            variant="h4"
                            component="h2"
                            align="center"
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
                    categoryName={'Floral'}
                    categoryItems={floral}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Bandana'}
                    categoryItems={bandana}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Animal'}
                    categoryItems={animal}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Pattern'}
                    categoryItems={pattern}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Solid'}
                    categoryItems={solid}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Hawaiian'}
                    categoryItems={hawaiian}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Patriot'}
                    categoryItems={patriot}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Holiday'}
                    categoryItems={holiday}
                    filterState={filter}
                />
                <RenderCategory
                    categoryName={'Shield'}
                    categoryItems={shield}
                    filterState={filter}
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
};

export default SelectionContainer;
