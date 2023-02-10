import { ListDataType } from "../../atomic/atoms/list/models";
import { BoxValueType } from "../../atomic/molecules/boxValue/models";

export interface ViewProps {
    user: string;
    search: string;
    setSearch: (value: string) => void;
    providersToCollect: BoxValueType[];
    providersCollected: BoxValueType[];
    providersDisabled: BoxValueType[];
    providerData: (id: string | number) => void;
    list: ListDataType[]
    listItemSelected: number;
    setListItemSelected: (index: number) => void;
}