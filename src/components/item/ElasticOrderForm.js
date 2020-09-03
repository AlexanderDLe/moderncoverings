import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    customizeBox: {
        paddingTop: 16,
        display: 'flex',
    },
    spanDimensions: {
        paddingLeft: 8,
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    smallSpanDimensions: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
        paddingBottom: 12,
    },
    radioLabel: {
        color: 'black',
    },
    sizeLabel: {
        color: 'rgba(0, 0, 0, 0.54) !important',
    },
    amountBox: {
        display: 'flex',
    },
    amountField: {
        marginTop: 10,
        paddingLeft: 5,
        width: '70%',
    },
    arrowsBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    arrow: {
        cursor: 'pointer',
    },
}));

function MaskOrderForm({
    navMediaQuery,
    size,
    amount,
    handleChange,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
}) {
    const classes = useStyles();

    // Dynamic Styles
    const radioQuery = navMediaQuery ? classes.normalQuery : classes.smallQuery;
    const spanQuery = navMediaQuery
        ? classes.spanDimensions
        : classes.smallSpanDimensions;

    return (
        <CardContent className={classes.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={classes.sizeLabel} component="legend">
                    Select Size
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="200 Yards"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                200 Yards
                                <span className={spanQuery}>$40</span>
                            </div>
                        }
                    />
                    <FormControlLabel
                        value="85 Yards"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                85 Yards
                                <span className={spanQuery}>$20</span>
                            </div>
                        }
                    />
                    <FormControlLabel
                        value="25 Yards"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                25 Yards
                                <span className={spanQuery}>$10</span>
                            </div>
                        }
                    />
                </RadioGroup>
            </FormControl>
            <div style={{ width: '50%' }}>
                <FormLabel style={{ paddingLeft: 5 }} component="legend">
                    Amount
                </FormLabel>
                <div className={classes.amountBox}>
                    <TextField
                        id="standard-number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={amount}
                        onChange={handleAmountChange}
                        className={classes.amountField}
                    />
                    <div className={classes.arrowsBox}>
                        <ArrowDropUpIcon
                            className={classes.arrow}
                            onClick={() => incrementAmount()}
                        />
                        <ArrowDropDownIcon
                            className={classes.arrow}
                            onClick={() => decrementAmount()}
                        />
                    </div>
                </div>
                <br />
                <br />
                <p style={{ color: 'rgba(0,0,0,.5', fontSize: '.85rem' }}>
                    These elastic bands measure 1/4" (6mm) in width.
                </p>
            </div>
        </CardContent>
    );
}

export default MaskOrderForm;
