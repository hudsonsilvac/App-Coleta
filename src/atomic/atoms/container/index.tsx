import styled from "styled-components/native";

import { AlignmentsStyledProps } from "../../constants/align";
import { IndexStyledProps } from "./models";

const Container = styled.SafeAreaView`
    background-color: ${( props: IndexStyledProps ) => ( props.bgColor ?? 'transparent' )};
    flex: 1;
    flex-direction: ${( props: AlignmentsStyledProps ) => ( props.flexDirection ?? 'column' )};
    justify-content: ${( props: AlignmentsStyledProps ) => ( props.justifyContent ?? 'flex-start' )};
    align-items: ${( props: AlignmentsStyledProps ) => ( props.alignItems ?? 'flex-start' )};
`

export default Container;