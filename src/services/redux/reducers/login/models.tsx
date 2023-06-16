export interface IndexProps {
    data: Data;
}

export type LoginTypes = IndexProps;

type Data = {
    id: string;
    name: string;
    dateLogin: string;
}