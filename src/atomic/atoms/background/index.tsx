import styled from "styled-components/native";
import { screenHeight, screenWidth } from "../../constants/dimension";
import { IndexStyledProps } from "./models";

const Background = styled.ImageBackground`
    width: ${screenWidth}px;
    height: ${( props: IndexStyledProps ) => ( !props.small ? `${screenHeight}px` : '350px' )} ;
    justify-content: ${( props: IndexStyledProps ) => ( props.justifyContent ?? 'center' )};
    align-items: center;
    padding-bottom: ${( props: IndexStyledProps ) => ( props.justifyContent == 'center' ? '0px' : '100px' )};
`

export default Background;