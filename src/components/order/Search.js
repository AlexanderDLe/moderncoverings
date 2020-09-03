import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        cursor: 'pointer',
    },
    searchButton: {
        border: 'none',
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 24,
    },
    textfield: {
        width: '200px',
    },
}));

function Search({ handleSearch, handleSearchTermChange, searchTerm }) {
    const classes = useStyles();

    return (
        <form className={classes.search} onSubmit={handleSearch}>
            <TextField
                onChange={handleSearchTermChange}
                label="Search Your Favorite Color"
                value={searchTerm}
                className={classes.textfield}
            />
            <div
                onClick={handleSearch}
                className={classes.searchButton}
                type="submit"
            >
                <SearchIcon className={classes.searchIcon} />
            </div>
        </form>
    );
}

export default Search;
