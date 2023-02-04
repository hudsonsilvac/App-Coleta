import { ItemType } from "../../atomic/organisms/item/models";

export interface ViewProps {
    address: string;
    phone: string;
    items: ItemType[];
    setItems: (items: ItemType[]) => void;
    total: string;
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    confirm: () => void;
}