export interface MaskForm {
    price: number;
    size: string;
    amount: number;
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    incrementAmount: () => void;
    decrementAmount: () => void;
}

export interface BagForm {
    price: number;
    size: string;
    amount: number;
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    incrementAmount: () => void;
    decrementAmount: () => void;
    addWaistBag: boolean;
    handleAddWaistBag: (value: boolean) => void;
}

export interface ElasticAndShieldForm {
    size: string;
    amount: number;
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    incrementAmount: () => void;
    decrementAmount: () => void;
}
