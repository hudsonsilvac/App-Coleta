import React from "react";

import Text from "../../atoms/text";
import { white } from "../../constants/colors";

import { Box, Main } from "./style";
import { IndexProps } from "./models";

const BoxValue: React.FC<IndexProps> = ({
    text,
    value,
    onPress
}) => {
    return (
        <Main onPress={onPress}>
            <Box value={{ state: value.state}}>
                <Text type='H4' text={value.description} color={white} weight='700' />
            </Box>
            <Text type='H4' text={text} ml='10px' />
        </Main>
    )
}

export default BoxValue