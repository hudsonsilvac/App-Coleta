import React from "react";

import { white } from "../../constants/colors";

import Text from "../../atoms/text";

import BackImg from '../../../assets/vectors/Back.png'

import { Main, Back, BackIcon } from "./style";
import IndexProps from "./models";

const Button: React.FC<IndexProps> = ({
    type = 'primary',
    text,
    onPress,
    disabled,
    larger,
    mt,
    ml,
    mr,
    mb
}) => {
    switch (type) {
        case 'primary':
        case 'success':
            return (
                <Main
                    onPress={onPress}
                    disabled={disabled}
                    type={type}
                    larger={larger}
                    mt={mt} ml={ml} mr={mr} mb={mb}
                >
                    <Text type='H4' text={String(text)} color={white} weight='700' />
                </Main>
            )
        case 'back':
            return (
                <Back onPress={onPress}>
                    <BackIcon source={BackImg} />
                </Back>
            )
    }
}

export default Button;