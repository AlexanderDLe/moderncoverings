import { makeStyles } from '@material-ui/core/styles';

export const SnackbarStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#444',
        borderRadius: '10px',
        color: 'white',
        padding: 12,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning: {
        color: 'yellow',
        fontSize: '1.5rem',
    },
    text: {
        padding: '0px 8px 0px 12px',
        margin: 0,
    },
    close: {
        cursor: 'pointer',
        fontSize: '1.5rem',
    },
}));

export const snackbarMediaQueries = (mediaQuery: boolean) => {
    let rootStyles = mediaQuery
        ? {
              width: 'auto',
              maxWidth: 800,
              margin: '0 auto',
          }
        : {};
    const textSizeStyles = { fontSize: mediaQuery ? '.925rem' : '.825rem' };

    return { rootStyles, textSizeStyles };
};
