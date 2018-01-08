export interface Reference {
    destination: string;
    title: string;
}
export declare type RefMap = {
    [k: string]: undefined | Reference;
};
