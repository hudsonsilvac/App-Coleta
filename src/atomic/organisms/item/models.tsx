export interface IndexProps {
    description: string;
    prevision: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
}

export type ItemType = {
    id: string | number;
    description: string;
    prevision: string;
    value: string;
    price: string;
}