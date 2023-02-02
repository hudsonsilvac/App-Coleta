import React from "react";
import { StatusBar } from "react-native";

import { IndexProps } from "./models";
import { Container } from './style'

const Main: React.FC<IndexProps> = ({
    statusBar,
    children,
    bgColor,
    padding
}) => {
    return (
        <Container padding={padding} bgColor={bgColor}>
            <StatusBar barStyle={statusBar?.barStyle ?? 'light-content'} backgroundColor={statusBar?.bgColor} translucent />
            { children }
        </Container>
    )
}

export default Main;