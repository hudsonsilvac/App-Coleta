import { ListDataType } from "../../atomic/atoms/list/models";
import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import { LoginTypes } from "../../services/redux/reducers/login/models";
import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

export interface IndexProps {
    dataUser: LoginTypes['data']
    setSupplierData: (data: SuppliersTypes['data']) => void;
    setReset: any;
    lastCollect: any;
    // lastCollect: CollectionsTypes['lastCollect']
    data: any
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