import { Order } from './Interfaces';

export const getInitialAmount = (mode: string): number => {
    let initialAmount = 0;
    if (mode === 'sandbox') initialAmount = 3;
    else if (mode === 'production') initialAmount = 0;
    return initialAmount;
};

export const getInitialOrders = (mode: string): Order[] => {
    let initialOrders: Order[] = [];
    if (mode === 'sandbox') {
        initialOrders = [
            {
                type: 'Mask',
                color: 'Black Test',
                param: 'black',
                price: 12.5,
                img: 'Black.jpg',
                size: 'L',
                amount: 1,
            },
            {
                type: 'Mask',
                color: 'White Test',
                param: 'white',
                price: 12.5,
                img: 'White.jpg',
                size: 'M',
                amount: 1,
            },
        ];
    } else if (mode === 'production') initialOrders = [];
    return initialOrders;
};
