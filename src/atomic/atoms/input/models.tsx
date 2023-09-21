import { KeyboardType } from "react-native";
import { StyledProps } from "styled-components";
import { Margins } from "../../constants/spacing";
import { TextAlign } from "../../constants/text";

export interface IndexProps extends Margins {
    width?: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    textAlign?: TextAlign;
    keyboardType?: KeyboardType | 'password'
    autoFocus?: boolean;
    onPress?: () => void;
    setStatePassword: () => void;
}

export type IndexStyledProps = StyledProps<IndexProps>