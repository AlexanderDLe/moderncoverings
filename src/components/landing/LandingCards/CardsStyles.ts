import { makeStyles } from '@material-ui/core/styles';
import BlueBG from '../../../img/Icons/BlackWhiteBG.jpg';

export const CardsStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    bgStyles: {
        background: `#000 url(${BlueBG}) no-repeat center`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 700,
        height: '100%',
        backgroundColor: 'white',
        margin: 8,
        padding: 16,
    },
    cardIMG: {
        height: 100,
        width: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cardMedia: {
        height: 'auto',
        width: '110px',
    },
    cardContent: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    cardTitle: {
        fontFamily: 'Raleway',
    },
}));

export const CardFlexStyles = (mediaQuery: boolean) => {
    return mediaQuery
        ? {
              display: 'flex',
              flexDirection: 'row',
          }
        : {
              flexDirection: 'column',
              textAlign: 'center',
          };
};
