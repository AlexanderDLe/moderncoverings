import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { FormStyles } from '../FormStyles';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AmountField from '../AmountField';
import RenderFormControlLabel from '../RenderFormControlLabel';

const ShieldOrderForm = ({
    size,
    amount,
    handleChange,
    incrementAmount,
    decrementAmount,
    handleAmountChange,
}) => {
    const styles = FormStyles();

    return (
        <CardContent className={styles.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={styles.sizeLabel} component="legend">
                    Select Amount
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleChange}
                >
                    <RenderFormControlLabel value="1x" label="1 For $7" />
                    <RenderFormControlLabel value="3x" label="3 For $5" />
                    <RenderFormControlLabel value="5x" label="5 For $20" />
                    <RenderFormControlLabel value="10x" label="10 For $30" />
                </RadioGroup>
            </FormControl>
            <div style={{ width: '50%' }}>
                <AmountField
                    amount={amount}
                    incrementAmount={incrementAmount}
                    decrementAmount={decrementAmount}
                    handleAmountChange={handleAmountChange}
                />
                <p style={{ color: 'rgba(0,0,0,.5', fontSize: '.85rem' }}>
                    Face Shields are not a replacement for facemasks.
                    <br />
                    <br />
                    An elastic band is worn to support the faceshield.
                </p>
            </div>
        </CardContent>
    );
};

export default ShieldOrderForm;
