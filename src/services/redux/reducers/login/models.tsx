export interface IndexProps {
    token: string;
    data: Data;
}

export type LoginTypes = IndexProps;

type Data = {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'customer'
}