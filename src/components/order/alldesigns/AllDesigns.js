import React, { useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import { selection } from '../../masks/MaskDesigns';
import SelectionHero from '../SelectionHero';
import SelectionFilter from '../SelectionFilter';
import AllSelectionContainer from './AllSelectionContainer';

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
        height: 'calc(100vh)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const searchThroughSelection = (selection, searchTerm) => {
    let selectionResults = [];
    Object.keys(selection).forEach((key) => {
        if (searchTerm === '') return selectionResults.push(selection[key]);
        else {
            let term = searchTerm.toLowerCase();
            let name = selection[key].color.toLowerCase();
            let catg = selection[key].category.toLowerCase();
            let tags = selection[key].tags;

            if (name.includes(term) || catg.includes(term)) {
                return selectionResults.push(selection[key]);
            }
            for (let tag of tags) {
                if (tag.toLowerCase().includes(term)) {
                    return selectionResults.push(selection[key]);
                }
            }
        }
    });
    return selectionResults;
};

export default ({
    showMoreObj,
    setShowMoreObj,
    yCoordinate,
    setYCoordinate,
}) => {
    const navMediaQuery = useMediaQuery('(min-width:900px)');

    const classes = useStyles();
    const [filter, setFilter] = useState('All');
    const [customOpen, setCustomOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Categories
    let solid = [];
    let patriot = [];
    let bandana = [];
    let pattern = [];
    let animal = [];
    let hawaiian = [];
    let floral = [];

    // Categorization
    const sortCategories = (selectionToSort) => {
        selectionToSort.forEach((item) => {
            let category = item.category;
            switch (category) {
                case 'solid':
                    solid.push(item);
                    break;
                case 'patriot':
                    patriot.push(item);
                    break;
                case 'floral':
                    floral.push(item);
                    break;
                case 'pattern':
                    pattern.push(item);
                    break;
                case 'hawaiian':
                    hawaiian.push(item);
                    break;
                case 'animal':
                    animal.push(item);
                    break;
                case 'bandana':
                    bandana.push(item);
                    break;
                default:
                    break;
            }
        });
    };

    const searchResults = searchThroughSelection(selection, searchTerm);
    sortCategories(searchResults);

    // Search
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const selectionPadding = useMemo(() => {
        return navMediaQuery
            ? { paddingTop: '24px', paddingBottom: '24px' }
            : {};
    }, [navMediaQuery]);

    return (
        <React.Fragment>
            <main className={classes.main}>
                <SelectionHero />
                <SelectionFilter filter={filter} setFilter={setFilter} />

                <AllSelectionContainer
                    selectionPadding={selectionPadding}
                    searchTerm={searchTerm}
                    handleSearchTermChange={handleSearchTermChange}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    yCoordinate={yCoordinate}
                    setYCoordinate={setYCoordinate}
                    filter={filter}
                    solid={solid}
                    patriot={patriot}
                    bandana={bandana}
                    pattern={pattern}
                    animal={animal}
                    hawaiian={hawaiian}
                    floral={floral}
                    customOpen={customOpen}
                    setCustomOpen={setCustomOpen}
                />
            </main>
        </React.Fragment>
    );
};
