import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
    holiday,
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
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <BagRenderCategory
                    categoryName={'Holiday'}
                    categoryItems={holiday}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Floral'}
                    categoryItems={floral}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Bandana'}
                    categoryItems={bandana}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Animal'}
                    categoryItems={animal}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Pattern'}
                    categoryItems={pattern}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Solid'}
                    categoryItems={solid}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Hawaiian'}
                    categoryItems={hawaiian}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
                    categoryName={'Patriot'}
                    categoryItems={patriot}
                    filterState={filter}
                    showMoreObj={showMoreObj}
                    setShowMoreObj={setShowMoreObj}
                    setYCoordinate={setYCoordinate}
                />
                <BagRenderCategory
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
