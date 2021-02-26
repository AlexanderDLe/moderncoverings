import { makeStyles } from '@material-ui/core/styles';

export const ItemStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: 450,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        paddingBottom: 8,
        margin: 16,
        marginTop: 40,
        marginBottom: 40,
        borderRadius: '0',
    },
    itemActions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px 8px',
    },
}));
