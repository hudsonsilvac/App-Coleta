import { ListDataType } from "../../atomic/atoms/list/models";
import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

export interface IndexProps {
    setSupplierData: (data: SuppliersTypes['data']) => void;
}

export interface ViewProps {
    user: string;
    search: string;
    setSearch: (value: string) => void;
    providersToCollect: SuppliersTypes['data'][];
    providersToDo: SuppliersTypes['data'][];
    providersSuccess: SuppliersTypes['data'][];
    providerData: (item: SuppliersTypes['data']) => void;
    list: ListDataType[]
    listItemSelected: number;
    setListItemSelected: (index: number) => void;
}

export type ProviderType = 'toCollect' | 'toDo' | 'success'