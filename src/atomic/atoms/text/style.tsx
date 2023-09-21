import styled from "styled-components/native";

import { black } from "../../constants/colors";
import { MarginsStyledProps } from "../../constants/spacing";
import { spacing, TextWeightStyledProps } from "../../constants/text";

import { IndexStyledProps } from "./models";

export const H1 = styled.Text`
    font-family: 'LexendDeca-Regular';
    font-size: 60px;
    font-weight: ${( props: TextWeightStyledProps ) => ( props.weight ?? '700' )};
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    letter-spacing: ${spacing};
    text-align: ${( props: IndexStyledProps ) => (props.textAlign ?? 'left')};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const H2 = styled.Text`
    font-family: 'LexendDeca-Regular';
    font-size: 40px;
    font-weight: ${( props: TextWeightStyledProps ) => ( props.weight ?? '700' )};
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    letter-spacing: ${spacing};
    text-align: ${( props: IndexStyledProps ) => (props.textAlign ?? 'left')};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const H3 = styled.Text`
    font-family: 'LexendDeca-Regular';
    font-size: 24px;
    font-weight: ${( props: TextWeightStyledProps ) => ( props.weight ?? '400' )};
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    letter-spacing: ${spacing};
    text-align: ${( props: IndexStyledProps ) => (props.textAlign ?? 'left')};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const H4 = styled.Text`
    font-family: 'LexendDeca-Regular';
    font-size: 19px;
    font-weight: ${( props: TextWeightStyledProps ) => ( props.weight ?? '400' )};
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    letter-spacing: ${spacing};
    text-align: ${( props: IndexStyledProps ) => (props.textAlign ?? 'left')};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const H5 = styled.Text`
    font-family: 'LexendDeca-Regular';
    font-size: 15px;
    font-weight: ${( props: TextWeightStyledProps ) => ( props.weight ?? '400' )};
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    letter-spacing: ${spacing};
    text-align: ${( props: IndexStyledProps ) => (props.textAlign ?? 'left')};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};
`

export const Bold = styled.Text`
    color: ${( props: IndexStyledProps ) => (props.color ?? black)};
    font-weight: 800;
`