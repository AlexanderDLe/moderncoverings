import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 8,
        zIndex: '100',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(250,250,255)',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '5rem',
    },
    textBox: {
        width: '100%',
        marginTop: 'auto',
        fontFamily: 'Open Sans',
        padding: '12px 4px 0px 4px',
        textAlign: 'center',
    },
    header: {
        marginBottom: 0,
        fontFamily: 'Raleway',
    },
    button: {
        color: 'white',
        fontWeight: '500',
        margin: '24px 4px',
        padding: '8px 32px 8px 32px',
    },
    button2: {
        fontWeight: '500',
        margin: '24px 4px',
        padding: '8px 32px 8px 32px',
        // border: '3px solid black'
    },
    caption: {
        marginBottom: 0,
    },
    usa: {
        fontSize: '.9rem',
        marginBottom: 0,
    },
}));

function SelectionHero({ queryStyles }) {
    const navMediaQuery900 = useMediaQuery('(min-width:900px)');
    const navMediaQuery535 = useMediaQuery('(min-width:535px)');
    const navMediaQuery340 = useMediaQuery('(min-width:340px)');
    const classes = useStyles();

    // const FacemaskIcon = useMemo(() => {
    //     return navMediaQuery535
    //         ? require(`../../img/LandingPhotos/FacemaskIcon1.jpg`)
    //         : require(`../../img/LandingPhotos/FacemaskIcon2.jpg`);
    // }, [navMediaQuery535]);

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
                    <Typography
                        component="h1"
                        variant="h1"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className={classes.logo}
                    >
                        MC
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h4"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className={classes.header}
                        style={textStyles.header}
                    >
                        Modern Coverings
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                        paragraph
                        style={textStyles.caption}
                        className={classes.caption}
                    >
                        Over 100+ Premium Designs
                    </Typography>

                    <Link to="/selection">
                        <Button
                            variant="contained"
                            className={classes.button}
                            style={textStyles.button}
                            color="primary"
                            size="medium"
                        >
                            SHOP MASKS
                        </Button>
                    </Link>
                    <Link to="/selection/bags">
                        <Button
                            variant="outlined"
                            className={classes.button2}
                            color="primary"
                            size="medium"
                        >
                            SHOP BAGS
                        </Button>
                    </Link>
                    {/* <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                        paragraph
                        className={classes.usa}
                    >
                        Made in USA
                    </Typography> */}
                </div>
            </div>
        </div>
    );
}

export default SelectionHero;
