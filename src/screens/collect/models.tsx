import { ItemType } from "../../atomic/organisms/item/models";

export interface ViewProps {
    address: string;
    phone: string;
    items: ItemType[];
    setItems: (items: ItemType[]) => void;
    total: string;
}