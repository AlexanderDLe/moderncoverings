import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { FormStyles } from '../FormStyles';
import { ElasticAndShieldForm } from './FormInterface';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AmountField from '../reusables/AmountField';
import RenderFormControlLabel from '../reusables/RenderFormControlLabel';

const ElasticOrderForm = ({
    size,
    amount,
    handleOptionChange,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
}: ElasticAndShieldForm) => {
    const styles = FormStyles();

    return (
        <CardContent className={styles.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={styles.sizeLabel} component="legend">
                    Select Size
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleOptionChange}
                >
                    <RenderFormControlLabel
                        value="200 Yards"
                        label="200 Yards"
                        measurement="$40"
                    />
                    <RenderFormControlLabel
                        value="85 Yards"
                        label="85 Yards"
                        measurement="$20"
                    />
                    <RenderFormControlLabel
                        value="25 Yards"
                        label="25 Yards"
                        measurement="$10"
                    />
                </RadioGroup>
            </FormControl>
            <div style={{ width: '50%' }}>
                <AmountField
                    amount={amount}
                    incrementAmount={incrementAmount}
                    decrementAmount={decrementAmount}
                    handleAmountChange={handleAmountChange}
                />
                <br />
                <br />
                <p style={{ color: 'rgba(0,0,0,.5', fontSize: '.85rem' }}>
                    These elastic bands measure 1/4" (6mm) in width.
                </p>
            </div>
        </CardContent>
    );
};

export default ElasticOrderForm;
