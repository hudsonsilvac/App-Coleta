export interface IndexProps {
    data: Data;
}

export type SuppliersTypes = IndexProps;

type Data = {
    id: string | number,
    name: string;
    phone: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
}