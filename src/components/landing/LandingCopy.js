import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    container: {
        padding: 8,
        zIndex: '100',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        paddingBottom: 12,
    },
    textBox: {
        width: '100%',
        marginTop: 'auto',
        fontFamily: 'Open Sans',
        backgroundColor: 'white',
        padding: '12px 4px 0px 4px',
        textAlign: 'center',
    },
    header: {
        marginBottom: 0,
        fontFamily: 'Open Sans',
    },
    button: {
        color: 'white',
        fontWeight: '500',
        margin: '24px 0px',
        padding: '8px 32px 8px 32px',
    },
    caption: {
        marginBottom: 0,
    },
    usa: {
        fontSize: '.9rem',
        marginBottom: 0,
    },
});

function SelectionHero({ queryStyles }) {
    const navMediaQuery900 = useMediaQuery('(min-width:900px)');
    const navMediaQuery535 = useMediaQuery('(min-width:535px)');
    const navMediaQuery340 = useMediaQuery('(min-width:340px)');
    const classes = useStyles();

    const FacemaskIcon = useMemo(() => {
        return navMediaQuery535
            ? require(`../../img/LandingPhotos/FacemaskIcon1.jpg`)
            : require(`../../img/LandingPhotos/FacemaskIcon2.jpg`);
    }, [navMediaQuery535]);

    const textStyles = useMemo(() => {
        return navMediaQuery900
            ? {
                  header: {
                      fontSize: '2rem',
                  },
                  caption: {
                      fontSize: '1rem',
                  },
              }
            : navMediaQuery535
            ? {
                  header: {
                      fontSize: '1.6rem',
                  },
                  caption: {
                      fontSize: '1rem',
                  },
              }
            : navMediaQuery340
            ? {
                  header: {
                      fontSize: '1.6rem',
                      fontWeight: 500,
                  },
                  caption: {
                      fontSize: '1rem',
                  },
              }
            : {
                  header: {
                      fontSize: '1.42rem',
                      fontWeight: 600,
                  },
                  caption: {
                      fontSize: '1rem',
                  },
              };
    }, [navMediaQuery340, navMediaQuery535, navMediaQuery900]);

    return (
        <div className={classes.root}>
            <div
                className={classes.container}
                style={queryStyles.sectionPadding}
            >
                <div className={classes.textBox}>
                    <img
                        className={classes.logo}
                        src={FacemaskIcon}
                        alt="Facemask Icon"
                    />
                    <Typography
                        component="h2"
                        variant="h4"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className={classes.header}
                        style={textStyles.header}
                    >
                        Look Good. Be Protected.
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                        paragraph
                        style={textStyles.caption}
                        className={classes.caption}
                    >
                        100+ Premium designs to keep yourself protected with
                        style.
                    </Typography>

                    <Link to="/selection">
                        <Button
                            variant="contained"
                            className={classes.button}
                            style={textStyles.button}
                            color="primary"
                            size="medium"
                        >
                            View Selection
                        </Button>
                    </Link>
                    <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                        paragraph
                        className={classes.usa}
                    >
                        Made in California, USA
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default SelectionHero;
