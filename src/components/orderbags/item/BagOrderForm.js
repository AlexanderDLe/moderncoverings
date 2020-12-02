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
    },
    radioLabel: {
        color: 'black !important',
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    sizeLabel: {
        color: 'rgba(0, 0, 0, 0.54) !important',
    },
    label: {
        paddingBottom: 8,
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
    price,
    navMediaQuery,
    size,
    amount,
    handleChange,
    handleAmountChange,
    XLUnavailable,
    incrementAmount,
    decrementAmount,
}) {
    const classes = useStyles();

    // Dynamic Styles
    const radioQuery = navMediaQuery ? classes.normalQuery : classes.smallQuery;
    const spanQuery = navMediaQuery
        ? classes.spanDimensions
        : classes.smallSpanDimensions;

    const renderFormControlLabel = (
        value,
        label,
        measurement,
        description,
        XLUnavailable
    ) => {
        return (
            <FormControlLabel
                className={classes.label}
                value={value}
                control={<Radio color="primary" />}
                label={
                    <div className={radioQuery}>
                        {label}
                        <span className={spanQuery}>
                            {measurement}
                            <br />
                            {XLUnavailable ? 'Unavailable' : description}
                        </span>
                    </div>
                }
                disabled={XLUnavailable}
            />
        );
    };

    return (
        <CardContent className={classes.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={classes.sizeLabel} component="legend">
                    Select Facemask Size
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleChange}
                >
                    {renderFormControlLabel(
                        'XL',
                        'XL Adult',
                        '10" x 6"',
                        'Large Adults',
                        XLUnavailable
                    )}
                    {renderFormControlLabel(
                        'L',
                        'L Adult',
                        '9.5" x 5.5"',
                        'Adults/Teens'
                    )}
                    {renderFormControlLabel(
                        'M',
                        'M Child',
                        '8.5" x 5"',
                        'Est. Ages 6-11'
                    )}
                    {renderFormControlLabel(
                        'S',
                        'S Child',
                        '7.5" x 4.5"',
                        'Est. Ages 4-6'
                    )}
                    {renderFormControlLabel(
                        'XS',
                        'XS Child',
                        '6.5" x 4"',
                        'Est. Ages 2-4'
                    )}
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
                <FormLabel
                    style={{ paddingLeft: 5, marginBottom: 0 }}
                    component="legend"
                >
                    Price: <span style={{ color: 'black' }}>${price}</span>
                </FormLabel>
                <br />
                <p
                    style={{
                        color: 'rgba(0,0,0,.5',
                        fontSize: '.85rem',
                        paddingLeft: 3,
                    }}
                >
                    Each set includes a matching draw-string bag and facemask.
                    <br />
                    <br />
                    Disclaimer: Some mask designs may vary depending on cut.
                </p>
            </div>
        </CardContent>
    );
}

export default MaskOrderForm;
