import { useState } from 'react';

export const setDefaultOption = (type: string): string => {
    return type === 'Mask' || type === 'Bag'
        ? 'L'
        : type === 'Elastic'
        ? '200 Yards'
        : '1x';
};

export const HandleOptionChange = (defaultOption: string) => {
    const [option, setOption] = useState(defaultOption);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
    };

    return { option, handleOptionChange };
};
