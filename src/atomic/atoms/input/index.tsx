import React from "react";

import Text from "../text";
import { gray } from "../../constants/colors";

import EyeOpen from '../../../assets/icons/eye.png'
import EyeClosed from '../../../assets/icons/eyeClosed.png'

import { IndexProps } from "./models";
import { Eye, Main, TextInput, Touch } from "./style";

const Input: React.FC<IndexProps> = ({
    width,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoFocus,
    onPress,
    setStatePassword,
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
                        secureTextEntry={keyboardType === 'password'}
                    />
                    {
                        setStatePassword && (
                            <Touch onPress={setStatePassword}>
                                <Eye source={keyboardType === 'default' ? EyeOpen : EyeClosed} />
                            </Touch>
                        )
                    }
                </Main>
            )
}

export default Input;