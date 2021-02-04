import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Search from './BagSearch';
import BagRenderCategory from './BagRenderCategory';


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

function SelectionContainer({
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
}) {
    const classes = useStyles();
    const yCoordinateBag = useSelector(state => state.app.yCoordinateBag);

    useEffect(() => {
        window.scrollTo(0, yCoordinateBag);
    }, [yCoordinateBag]);

    // Render
    const renderDesigns = () => {
        return (
            <React.Fragment>
                <BagRenderCategory
                    categoryName={'Holiday'}
                    categoryItems={holiday}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Floral'}
                    categoryItems={floral}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Bandana'}
                    categoryItems={bandana}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Animal'}
                    categoryItems={animal}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Pattern'}
                    categoryItems={pattern}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Solid'}
                    categoryItems={solid}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Hawaiian'}
                    categoryItems={hawaiian}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Patriot'}
                    categoryItems={patriot}
                    filterState={filter}
                />
                <BagRenderCategory
                    categoryName={'Shield'}
                    categoryItems={shield}
                    filterState={filter}
                />
            </React.Fragment>
        );
    };

    return (
        <Container className={classes.root} style={selectionPadding}>
            {/* <BagTextImage /> */}
            <Search
                searchTerm={searchTerm}
                handleSearchTermChange={handleSearchTermChange}
            />
            {renderDesigns()}
        </Container>
    );
}

export default SelectionContainer;
