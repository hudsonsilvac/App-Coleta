import styled from "styled-components/native";

import { borderRadius, shadowSuccess } from "../../constants/button";
import { grey, primary, success } from "../../constants/colors";
import { MarginsStyledProps } from "../../constants/spacing";
import { IndexStyledProps } from "./models";
import { shadowPrimary } from "../../constants/button";

export const Main = styled.TouchableOpacity`
    padding: ${( props: IndexStyledProps ) => ( props.larger ? '20px 70px' : '20px 40px')};
    justify-content: center;
    align-items: center;
    background-color: ${( props: IndexStyledProps ) => ( props.disabled ? `${grey}` : props.type == 'primary' ? `${primary}` : `${success}` )};
    border-radius: ${borderRadius};
    elevation: ${( props: IndexStyledProps ) => ( props.disabled ? 0 : `${shadowPrimary.elevation}`)};
    box-shadow: ${( props: IndexStyledProps ) => ( props.disabled ? 'none' : props.type == 'primary' ? `${shadowPrimary.boxShadow}` : `${shadowSuccess.boxShadow}`)};
    shadow-opacity: ${( props: IndexStyledProps ) => ( props.disabled ? 0 : props.type == 'primary' ? `${shadowPrimary.shadowOpacity}` : `${shadowSuccess.shadowOpacity}`)};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const Back = styled.TouchableOpacity`
    padding: 0 20px;
    justify-content: center;
    align-items: center;
`

export const BackIcon = styled.Image`
    width: 15px;
    height: 25px;
`