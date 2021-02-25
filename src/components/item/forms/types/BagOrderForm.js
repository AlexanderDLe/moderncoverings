import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { FormStyles } from '../FormStyles';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AmountField from '../reusables/AmountField';
import RenderFormControlLabel from '../reusables/RenderFormControlLabel';

const BagOrderForm = ({
    price,
    size,
    amount,
    handleOptionChange,
    handleAmountChange,
    XLUnavailable,
    incrementAmount,
    decrementAmount,
    addWaistBag,
    setAddWaistBag,
    waistBagPrice,
}) => {
    const styles = FormStyles();

    const renderPrice = () => {
        if (addWaistBag) return price + waistBagPrice;
        else return price;
    };
    const additionalCost = addWaistBag ? waistBagPrice : 0;

    return (
        <React.Fragment>
            <CardContent className={styles.checkboxContainer}>
                <Checkbox
                    className={styles.checkbox}
                    checked={addWaistBag}
                    onClick={() => {
                        setAddWaistBag(!addWaistBag);
                    }}
                    color="primary"
                />
                <div className={styles.checkboxText}>
                    (Optional) Add matching waist bag for $15
                </div>
            </CardContent>
            <CardContent className={styles.customizeBox}>
                <FormControl style={{ width: '50%' }} component="fieldset">
                    <FormLabel className={styles.sizeLabel} component="legend">
                        Select Facemask Size
                    </FormLabel>
                    <RadioGroup
                        aria-label="Mask Size"
                        name="Size"
                        value={size}
                        onChange={handleOptionChange}
                    >
                        <RenderFormControlLabel
                            value="XL"
                            label="XL Adult"
                            measurement='10" x 6"'
                            description="Large Adults"
                            XLUnavailable={XLUnavailable}
                        />
                        <RenderFormControlLabel
                            value="L"
                            label="L Adult"
                            measurement='9.5" x 5.5"'
                            description="Adults/Teens"
                        />
                        <RenderFormControlLabel
                            value="M"
                            label="M Child"
                            measurement='8.5" x 5"'
                            description="Est. Ages 6-11"
                        />
                        <RenderFormControlLabel
                            value="S"
                            label="S Child"
                            measurement='7.5" x 4.5"'
                            description="Est. Ages 4-6"
                        />
                        <RenderFormControlLabel
                            value="XS"
                            label="XS Child"
                            measurement='6.5" x 4"'
                            description="Est. Ages 2-4"
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
                    <FormLabel
                        style={{ paddingLeft: 5, marginBottom: 0 }}
                        component="legend"
                    >
                        Price:{' '}
                        <span style={{ color: 'black' }}>${renderPrice()}</span>{' '}
                        <span className={styles.compareAtPrice}>
                            {60 + additionalCost}
                        </span>
                    </FormLabel>
                    <br />
                    <p
                        style={{
                            color: 'rgba(0,0,0,.5',
                            fontSize: '.85rem',
                            paddingLeft: 3,
                        }}
                    >
                        Each set includes a matching draw-string bag and
                        facemask.
                        <br />
                        <br />
                        Optionally, you may choose to include a matching waist
                        bag for an additional $15.
                        <br />
                        <br />
                        Bag Dimensions:
                        <br />
                        14" tall - 9.5" diameter.
                        <br />
                        <br />
                        Disclaimer: Some designs may slightly vary depending on
                        cut.
                    </p>
                </div>
            </CardContent>
        </React.Fragment>
    );
};

export default BagOrderForm;
