import styled from "styled-components/native";
import { grey } from "../../constants/colors";
import { IndexStyledProps } from "./models";

export const Main = styled.FlatList`
    width: 100%;
    height: 50px;
`

export const Item = styled.TouchableOpacity`
    padding: 10px 20px;
    background-color: ${( props: IndexStyledProps ) => ( props.bgColor )};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`

export const Separator = styled.View`
    width: 10px;
`