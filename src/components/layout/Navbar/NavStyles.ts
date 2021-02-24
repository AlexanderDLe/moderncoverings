import { makeStyles } from '@material-ui/core/styles';

const navTextColor = 'black';

export const NavbarStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: 'rgb(250,250,255)',
        boxShadow: '0px 0px 5px rgba(0,0,0,.25)',
    },
    title: {
        flexGrow: 1,
        color: `${navTextColor} !important`,
        textDecoration: 'none',
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '1.5rem',
    },
    navIcon: {
        padding: 3,
        paddingTop: 8,
    },
    link: {
        color: `${navTextColor} !important`,
        textDecoration: 'none',
        fontFamily: 'Raleway',
    },
    shoppingCartIcon: {
        fontSize: '1.2rem',
    },
    cartAmount: {
        marginLeft: '3px',
        color: navTextColor,
        textDecoration: 'none',
    },
}));

export const NavMenuStyles = makeStyles((theme) => ({
    menuIcon: {
        color: navTextColor,
        display: 'block',
    },
    menuItem: {
        color: navTextColor,
        textDecoration: 'none',
    },
}));
