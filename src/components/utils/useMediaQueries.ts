import { useMediaQuery } from '@material-ui/core';

const useMediaQueries = () => {
    return {
        min600: useMediaQuery('(min-width:600px)'),
        min420: useMediaQuery('(min-width:420px)'),
    };
};

export default useMediaQueries;
