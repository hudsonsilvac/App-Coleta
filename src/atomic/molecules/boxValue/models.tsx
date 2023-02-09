import { StyledProps } from "styled-components"

export interface IndexProps {
    text: string;
    value: StateType;
    onPress: () => void;
}

type StateType = {
    state: 'normal' | 'success' | 'disabled'
    description: string;
}

export type BoxValueType = {
    id: string | number;
    text: string;
    value: StateType;
};
export type IndexStyledProps = StyledProps<IndexProps>