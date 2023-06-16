import styled from "styled-components/native";

import { gray, black, grey } from "../../constants/colors";
import { MarginsStyledProps } from "../../constants/spacing";
import { IndexStyledProps } from "./models";

export const Main = styled.TouchableOpacity`
    width: ${( props: IndexStyledProps ) => ( props.width ?? 'null' )};
    height: 65px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${grey};
    border-radius: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const TextInput = styled.TextInput.attrs({
    placeholderTextColor: gray
})`
    font-family: 'LexendDeca-Regular';
    color: ${black};
    flex: 1;
    text-align: ${( props: IndexStyledProps ) => ( props.textAlign ?? 'left' )};
    font-size: 21px;
`