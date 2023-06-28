import { Image } from "react-native";
import { StyledProps } from "styled-components";
import { Margins } from "../../constants/spacing";

export default interface IndexProps extends Margins {
    type?: ButtonTypes;
    text?: string | Image;
    icon?: SVGElement | Image;
    onPress: () => void;
    disabled?: boolean
    larger?: boolean;
    isLoading?: boolean;
}

export type ButtonTypes = 'primary' | 'success' | 'back'

export type IndexStyledProps = StyledProps<IndexProps>