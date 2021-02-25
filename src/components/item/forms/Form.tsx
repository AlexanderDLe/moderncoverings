import React from 'react';
import MaskOrderForm from './types/MaskOrderForm';
import BagOrderForm from './types/BagOrderForm';
import ElasticOrderForm from './types/ElasticOrderForm';
import ShieldOrderForm from './types/ShieldOrderForm';

interface Props {
    avail: boolean;
    type: string;
    handleOptionChange: (e: any) => void;
    amount: number;
    size: string;
    handleAmountChange: (e: any) => void;
    price: string;
    XLUnavailable?: boolean;
    incrementAmount: () => void;
    decrementAmount: () => void;
    addWaistBag: boolean;
    setAddWaistBag: React.Dispatch<React.SetStateAction<boolean>>;
    waistBagPrice: number;
}

const Form = ({
    avail,
    type,
    amount,
    size,
    price,
    XLUnavailable,
    addWaistBag,
    waistBagPrice,
    handleOptionChange,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
    setAddWaistBag,
}: Props) => {
    const renderMaskForm = () => {
        return (
            <MaskOrderForm
                handleOptionChange={handleOptionChange}
                amount={amount}
                size={size}
                handleAmountChange={handleAmountChange}
                price={price}
                XLUnavailable={XLUnavailable ? true : false}
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
                XLUnavailable={XLUnavailable ? true : false}
                incrementAmount={incrementAmount}
                decrementAmount={decrementAmount}
                addWaistBag={addWaistBag}
                setAddWaistBag={setAddWaistBag}
                waistBagPrice={waistBagPrice}
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
