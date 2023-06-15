import styled from "styled-components/native";

import { borderRadius2 } from "../../constants/button";
import { grey, normal, primary, success } from "../../constants/colors";
import { IndexStyledProps } from "./models";

export const Main = styled.TouchableOpacity`
    width: 100%;
    height: 70px;
    border-radius: ${borderRadius2};
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const Box = styled.View`
    width: 45px;
    height: 45px;
    border-radius: ${borderRadius2};
    background-color: ${( props: IndexStyledProps ) => ( props.value.state == 'success'
                                                            ? `${success}`
                                                            : props.value.state == 'primary'
                                                            ? `${primary}`
                                                            : `${normal}` )};
    justify-content: center;
    align-items: center
`