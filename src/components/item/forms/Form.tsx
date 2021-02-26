import React from 'react';
import MaskOrderForm from './types/MaskOrderForm';
import BagOrderForm from './types/BagOrderForm';
import ElasticOrderForm from './types/ElasticOrderForm';
import ShieldOrderForm from './types/ShieldOrderForm';

interface Props {
    avail: boolean;
    type: string;
    amount: number;
    size: string;
    price: number;
    addWaistBag: boolean;
    handleOptionChange: (e: any) => void;
    handleAmountChange: (e: any) => void;
    incrementAmount: () => void;
    decrementAmount: () => void;
    handleAddWaistBag: (value: boolean) => void;
}

const Form = ({
    avail,
    type,
    amount,
    size,
    price,
    addWaistBag,
    handleOptionChange,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
    handleAddWaistBag,
}: Props) => {
    const renderMaskForm = () => {
        return (
            <MaskOrderForm
                handleOptionChange={handleOptionChange}
                amount={amount}
                size={size}
                handleAmountChange={handleAmountChange}
                price={price}
                incrementAmount={incrementAmount}
                decrementAmount={decrementAmount}
            />
        );
    };
    const renderElasticForm = () => {
        return (
            <ElasticOrderForm
                handleOptionChange={handleOptionChange}
                amount={amount}
                size={size}
                handleAmountChange={handleAmountChange}
                incrementAmount={incrementAmount}
                decrementAmount={decrementAmount}
            />
        );
    };

    const renderShieldForm = () => {
        return (
            <ShieldOrderForm
                handleOptionChange={handleOptionChange}
                amount={amount}
                size={size}
                handleAmountChange={handleAmountChange}
                incrementAmount={incrementAmount}
                decrementAmount={decrementAmount}
            />
        );
    };
    const renderBagForm = () => {
        return (
            <BagOrderForm
                handleOptionChange={handleOptionChange}
                amount={amount}
                size={size}
                handleAmountChange={handleAmountChange}
                price={price}
                incrementAmount={incrementAmount}
                decrementAmount={decrementAmount}
                addWaistBag={addWaistBag}
                handleAddWaistBag={handleAddWaistBag}
            />
        );
    };
    const renderForm = () => {
        if (!avail) {
            return (
                <div style={{ textAlign: 'center' }}>
                    Sorry, this design is no longer available.
                </div>
            );
        } else if (type === 'Mask') {
            return renderMaskForm();
        } else if (type === 'Elastic') {
            return renderElasticForm();
        } else if (type === 'Shield') {
            return renderShieldForm();
        } else if (type === 'Bag') {
            return renderBagForm();
        }
    };

    return <>{renderForm()}</>;
};

export default Form;
