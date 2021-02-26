import { selection as MaskSelection } from './MaskDesigns';
import { selection as BagSelection } from './BagSets';

export type PriceObject = {
    [key: string]: number;
};

export interface DesignData {
    type: string;
    color: string;
    img: string;
    param: string;
    price: PriceObject | number;
    category: string;
    angled?: boolean;
    tags: string[];
}

export interface Designs {
    [key: string]: DesignData;
}

const selection = { ...MaskSelection, ...BagSelection };
export default selection;
