import { useMediaQuery } from '@material-ui/core';

const useMediaQueries = () => {
    return {
        min600px: useMediaQuery('(min-width:600px)'),
        min420px: useMediaQuery('(min-width:420px)'),
    };
};

export default useMediaQueries;
