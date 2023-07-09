import { ItemType } from "../../atomic/organisms/item/models";
import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

export interface IndexProps {
    dataSupplier: SuppliersTypes['data']
    setLastCollect: (lastCollect: CollectionsTypes['lastCollect']) => void;
}

export interface ViewProps {
    address: string;
    phone: string;
    items: ItemType[];
    setItem: (value: string, id: string) => void;
    total: string;
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    type: string;
    confirm: () => void;
    loadingConfirm: boolean;
}