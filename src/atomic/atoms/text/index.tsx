import React from "react";

import { Bold, H1, H2, H3, H4, H5 } from "./style";
import Model from "./models";

const Text: React.FC<Model> = ({
    text,
    textBold,
    type,
    color,
    align,
    weight,
    mt,
    ml,
    mr,
    mb
}) => {
    switch (type) {
        case 'H1':
            return (
                <H1
                    color={color}
                    textAlign={align}
                    weight={weight}
                    mt={mt}
                    ml={ml}
                    mr={mr}
                    mb={mb}
                >
                    { text }
                    {
                        textBold && (
                            <Bold>
                                {' '}{ textBold }
                            </Bold>
                        )
                    }
                </H1>
            )
        case 'H2':
            return (
                <H2
                    color={color}
                    textAlign={align}
                    weight={weight}
                    mt={mt}
                    ml={ml}
                    mr={mr}
                    mb={mb}
                >
                    { text }
                    {
                        textBold && (
                            <Bold>
                                {' '}{ textBold }
                            </Bold>
                        )
                    }
                </H2>
            )
        case 'H3':
            return (
                <H3
                    color={color}
                    textAlign={align}
                    weight={weight}
                    mt={mt}
                    ml={ml}
                    mr={mr}
                    mb={mb}
                >
                    { text }
                    {
                        textBold && (
                            <Bold>
                                {' '}{ textBold }
                            </Bold>
                        )
                    }
                </H3>
            )
        case 'H4':
            return (
                <H4
                    color={color}
                    textAlign={align}
                    weight={weight}
                    mt={mt}
                    ml={ml}
                    mr={mr}
                    mb={mb}
                >
                    { text }
                    {
                        textBold && (
                            <Bold>
                                {' '}{ textBold }
                            </Bold>
                        )
                    }
                </H4>
            )
        case 'H5':
            return (
                <H5
                    color={color}
                    textAlign={align}
                    weight={weight}
                    mt={mt}
                    ml={ml}
                    mr={mr}
                    mb={mb}
                >
                    { text }
                    {
                        textBold && (
                            <Bold>
                                {' '}{ textBold }
                            </Bold>
                        )
                    }
                </H5>
            )
    }
}

export default Text;