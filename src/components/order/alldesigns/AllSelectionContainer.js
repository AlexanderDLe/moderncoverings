import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import DesignCard from '../DesignCard';
import CustomCard from '../CustomCard';
import { selection } from '../../designs/MaskDesigns';
import Search from '../Search';
import AllRenderCategory from './AllRenderCategory';

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
    customOpen,
    setCustomOpen,
}) => {
    const classes = useStyles();

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
                <AllRenderCategory
                    categoryName={'Holiday'}
                    categoryItems={holiday}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Bandana'}
                    categoryItems={bandana}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Floral'}
                    categoryItems={floral}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Animal'}
                    categoryItems={animal}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Pattern'}
                    categoryItems={pattern}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Solid'}
                    categoryItems={solid}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Hawaiian'}
                    categoryItems={hawaiian}
                    filterState={filter}
                />
                <AllRenderCategory
                    categoryName={'Patriot'}
                    categoryItems={patriot}
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
