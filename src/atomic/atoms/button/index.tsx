import React from "react";

import { white } from "../../constants/colors";

import Text from "../text";

import Main from "./style";
import IndexProps from "./models";

const Button: React.FC<IndexProps> = ({
    type = 'primary',
    text,
    onPress,
    disabled,
    mt,
    ml,
    mr,
    mb
}) => {
    return (
        <Main
            onPress={onPress}
            disabled={disabled}
            type={type}
            mt={mt} ml={ml} mr={mr} mb={mb}
        >
            <Text type='H4' text={String(text)} color={white} />
        </Main>
    )
}

export default Button;