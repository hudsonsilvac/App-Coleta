import styled from "styled-components/native";
import { IndexStyledProps } from "./models";

export const Container = styled.ScrollView`
    flex: 1;
    padding: ${( props: IndexStyledProps ) => ( props.padding ? `20px 16px` : '0px' )};
    background-color: ${( props: IndexStyledProps ) => ( props.bgColor ?? '#FFF' )};
`