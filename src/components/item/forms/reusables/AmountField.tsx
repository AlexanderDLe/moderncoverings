import React from 'react';
import { AmountFieldStyles } from '../FormStyles';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
    amount: number;
    incrementAmount: () => void;
    decrementAmount: () => void;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountField = ({
    amount,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
}: Props) => {
    const styles = AmountFieldStyles();

    return (
        <>
            <FormLabel style={{ paddingLeft: 5 }} component="legend">
                Amount
            </FormLabel>
            <div className={styles.amountBox}>
                <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={amount}
                    onChange={handleAmountChange}
                    className={styles.amountField}
                />
                <div className={styles.arrowsBox}>
                    <ArrowDropUpIcon
                        className={styles.arrow}
                        onClick={() => incrementAmount()}
                    />
                    <ArrowDropDownIcon
                        className={styles.arrow}
                        onClick={() => decrementAmount()}
                    />
                </div>
            </div>
        </>
    );
};

export default AmountField;
