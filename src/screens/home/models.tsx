import { BoxValueType } from "../../atomic/molecules/boxValue/models";

export interface ViewProps {
    user: string;
    search: string;
    setSearch: (value: string) => void;
    customersToCollect: BoxValueType[];
    customersCollected: BoxValueType[];
    customerData: (id: string | number) => void;
}