import { StyledProps } from "styled-components";

export interface IndexProps {
    data: ListDataType[];
    selected: number;
    setSelected: (index: number) => void;
}

export type ListDataType = {
    id: number;
    text: string;
    selected: string;
}

export type IndexStyledProps = StyledProps<{
    bgColor: string
}>