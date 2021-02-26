import { useState, useRef } from 'react';
import { waistBagPrice } from './../../designs/BagSets';

export const packageItem = (
    data: any,
    addWaistBag: boolean,
    option: string,
    amount: number
) => {
    let price = 0;
    let additionalBagPrice = addWaistBag ? waistBagPrice : 0;

    if (data.type === 'Mask') price = data.price;
    else if (data.type === 'Bag') {
        price = data.price + additionalBagPrice;
    } else if (data.type === 'Elastic' || data.type === 'Shield') {
        price = data.price[option];
    }

    let productName = data.color;
    if (data.type === 'Bag') {
        if (addWaistBag) productName = `3 piece ${data.color}`;
        else productName = `2 piece ${data.color}`;
    }

    return {
        type: data.type,
        color: productName,
        size: option,
        amount: amount,
        param: data.param,
        price: price,
        img: data.img,
    };
};

export const setDefaultOption = (type: string): string => {
    switch (type) {
        case 'Shield':
            return '1x';
        case 'Elastic':
            return '200 Yards';
        default:
            return 'L';
    }
};

export const HandleOptions = (defaultOption: string) => {
    const [option, setOption] = useState(defaultOption);
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
    };
    return { option, handleOptionChange };
};

export const HandleAmount = () => {
    const [amount, setAmount] = useState(1);
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Math.ceil(parseInt(event.target.value)));
    };
    const increment = () => {
        setAmount(amount + 1);
    };
    const decrement = () => {
        if (amount > 1) setAmount(amount - 1);
    };
    return { amount, change, increment, decrement };
};

export const HandleModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = (value: boolean) => {
        setModalOpen(value);
    };
    return { modalOpen, handleModalOpen };
};

export const HandleImageAngle = () => {
    const [angledState, setAngledState] = useState('Normal');
    const handleAngleChange = () => {
        if (angledState === 'Normal') setAngledState('Angled');
        if (angledState === 'Angled') setAngledState('Normal');
    };
    return { angledState, handleAngleChange };
};

export const HandleAddWaistBag = () => {
    const [addWaistBag, setAddWaistBag] = useState(false);

    const handleAddWaistBag = (value: boolean) => {
        setAddWaistBag(value);
    };

    return { addWaistBag, handleAddWaistBag };
};

interface QueueItem {
    message: string;
    key: number;
}
export const HandleSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [msgInfo, setMsgInfo] = useState<QueueItem | undefined>(undefined);
    const queueRef = useRef<QueueItem[]>([]);

    const handleSnackbarOpen = (value: boolean) => {
        setSnackbarOpen(value);
    };

    const addToQueue = (amount: number) => {
        queueRef.current.push({
            message: `Added ${amount} item(s) to cart`,
            key: new Date().getTime(),
        });
        if (snackbarOpen) handleSnackbarOpen(false);
        else processQueue();
    };

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMsgInfo(queueRef.current.shift());
            setSnackbarOpen(true);
        }
    };

    const handleExited = () => {
        processQueue();
    };

    return {
        snackbarOpen,
        msgInfo,
        addToQueue,
        handleSnackbarOpen,
        handleExited,
    };
};
