import { StyledProps } from "styled-components";
import { StatusBarStyle, ColorValue } from "react-native";

export interface IndexProps {
    statusBar?: StatusBarType;
    children?: React.ReactNode[] | React.ReactNode | undefined | string | number;
    bgColor?: ColorValue | string;
    padding?: boolean;
}

type StatusBarType = {
    doNotShow?: boolean;
    barStyle?: null | StatusBarStyle | undefined;
    bgColor?: ColorValue | undefined;
}

export type IndexStyledProps = StyledProps<IndexProps>
