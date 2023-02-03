import styled from "styled-components/native";
import { borderRadius2 } from "../../constants/button";
import { black, grey } from "../../constants/colors";
import { spacing } from "../../constants/text";

export const Main = styled.TouchableOpacity`
    width: 100%;
    height: 70px;
    padding: 5px;
    flex-direction: row;
    align-items: center;
`

export const BoxIcon = styled.View`
    width: 50px;
    height: 50px;
    background-color: ${grey};
    border-radius: ${borderRadius2};
    justify-content: center;
    align-items: center;
`

export const Icon = styled.Text`
    font-size: 24px;
`

export const Input = styled.TextInput`
    width: 100%;
    height: 100%;
    font-family: 'LexendDeca-Regular';
    font-size: 20px;
    font-weight: 700;
    color: ${black};
    letter-spacing: ${spacing};
    text-align: right;
`