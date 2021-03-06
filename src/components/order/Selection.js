import React, { useEffect, useState, useMemo } from 'react';
import keys from '../../config/keys';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selection as maskSelection } from '../../designs/MaskDesigns';
import { selection as bagSelection } from '../../designs/BagSets';
import MCSelectionHero from './MCSelectionHero';
import SelectionContainer from './SelectionContainer';
let selection = [];

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

const Selection = ({ match }) => {
    const [loading, setLoading] = useState(true);
    const [designAvailability, setDesignAvailability] = useState({});

    // Don't show hero if on internet explorer
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isFirefox = typeof InstallTrigger !== 'undefined';

    useEffect(() => {
        async function process() {
            try {
                const category = match.params.category;
                const determineAPI = (category) => {
                    if (category === 'masks') return keys.designsAPI;
                    if (category === 'bags') return keys.bagDesignsAPI;
                };
                const determineSelection = (category) => {
                    if (category === 'masks') return maskSelection;
                    else if (category === 'bags') return bagSelection;
                };

                const API = determineAPI(category);
                selection = determineSelection(category);

                let response = await axios.get(API);
                console.log(response.data);
                setDesignAvailability(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        process();
    }, [match.params.category]);
    const navMediaQuery = useMediaQuery('(min-width:900px)');

    const classes = useStyles();
    // const [filter, setFilter] = useState('All');
    const [filter] = useState('All');
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
    let holiday = [];
    let shield = [];

    // Categorization
    const sortCategories = (selectionToSort) => {
        selectionToSort.forEach((item) => {
            if (!designAvailability[item.param]) return;
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
                case 'holiday':
                    holiday.push(item);
                    break;
                case 'shield':
                    shield.push(item);
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
            ? { paddingTop: '24px', paddingBottom: '64px' }
            : {};
    }, [navMediaQuery]);

    return (
        <React.Fragment>
            <main className={classes.main}>
                {/* <Banner /> */}
                {isIE || isFirefox ? '' : <MCSelectionHero />}
                {/* <SelectionFilter filter={filter} /> */}
                {loading ? (
                    <div className={classes.LoadingDiv}>
                        <CircularProgress />
                    </div>
                ) : (
                    <SelectionContainer
                        selectionPadding={selectionPadding}
                        searchTerm={searchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        filter={filter}
                        solid={solid}
                        patriot={patriot}
                        bandana={bandana}
                        pattern={pattern}
                        animal={animal}
                        hawaiian={hawaiian}
                        floral={floral}
                        holiday={holiday}
                        shield={shield}
                        customOpen={customOpen}
                        setCustomOpen={setCustomOpen}
                    />
                )}
            </main>
        </React.Fragment>
    );
};

export default Selection;
