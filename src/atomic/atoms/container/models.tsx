import { ColorValue } from "react-native";
import { StyledProps } from "styled-components";

export type IndexStyledProps = StyledProps<{
    heightContent?: boolean;
    bgColor?: ColorValue | undefined;
    noTab?: boolean;
}>