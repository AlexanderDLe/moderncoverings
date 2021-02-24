export type ShowMoreObj = {
    Bandana: boolean;
    Floral: boolean;
    Animal: boolean;
    Pattern: boolean;
    Solid: boolean;
    Hawaiian: boolean;
    Patriot: boolean;
    Shield: boolean;
    Holiday: boolean;
};

export type InitialState = {
    mode: string;
    yCoordinateMask: number;
    yCoordinateBag: number;
    authenticated: string | boolean;
    showMoreMaskObj: ShowMoreObj;
    showMoreBagObj: ShowMoreObj;
};
