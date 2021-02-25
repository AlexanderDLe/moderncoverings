import { makeStyles } from '@material-ui/core/styles';

export const BannerStyles = makeStyles((theme) => ({
    banner: {
        backgroundColor: '#424242',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    textbox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    flag: {
        height: 60,
        width: 'auto',
        paddingBottom: 16,
        boxShadow: 'none',
        fontSize: '1rem',
    },
}));

export const bannerHeight = (mediaQuery: boolean) => {
    return {
        paddingTop: mediaQuery ? 24 : 18,
        height: mediaQuery ? 65 : 50,
    };
};
