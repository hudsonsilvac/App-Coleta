import { ColorValue } from "react-native";
import { StyledProps } from "styled-components"

export interface IndexProps {
    text: string;
    value: StateType;
    onPress: () => void;
}

type StateType = {
    state: ColorValue;
    description: string;
}

export type BoxValueType = {
    id: string | number;
    text: string;
    value: StateType;
};
export type IndexStyledProps = StyledProps<IndexProps>