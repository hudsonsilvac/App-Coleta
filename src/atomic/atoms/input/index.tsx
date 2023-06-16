import React from "react";

import { IndexProps } from "./models";
import { Main, TextInput } from "./style";
import Text from "../text";
import { gray } from "../../constants/colors";

const Input: React.FC<IndexProps> = ({
    width,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoFocus,
    onPress,
    mt,
    ml,
    mr,
    mb
}) => {
    return onPress
            ? (
                <Main width={width} onPress={onPress} mt={mt} ml={ml} mr={mr} mb={mb}>
                    <Text type='H4' text={placeholder} color={gray} align='center' />
                </Main>
            ) : (
                <Main width={width} activeOpacity={1} mt={mt} ml={ml} mr={mr} mb={mb}>
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