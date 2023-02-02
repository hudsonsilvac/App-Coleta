import React from "react";

import { IndexProps } from "./models";
import { Main, TextInput } from "./style";

const Input: React.FC<IndexProps> = ({
    width,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoFocus,
    mt,
    ml,
    mr,
    mb
}) => {
    return (
        <Main width={width} mt={mt} ml={ml} mr={mr} mb={mb}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
            />
        </Main>
    )
}

export default Input;