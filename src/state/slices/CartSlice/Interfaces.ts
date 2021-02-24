export type Order = {
    type: string;
    color: string;
    param: string;
    price: number;
    img: string;
    size: string;
    amount: number;
};

export type InitialCartState = {
    usedDiscountButton: boolean;
    orders: Order[];
    amount: number;
};
