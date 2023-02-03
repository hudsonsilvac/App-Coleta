import styled from "styled-components/native";
import { AlignmentsStyledProps } from "../../../constants/align";
import { borderRadius2, shadow } from "../../../constants/button";
import { MarginsStyledProps, PaddingsStyledProps, PositionStyledProps } from "../../../constants/spacing";
import { IndexStyledProps } from "./models";

const BoxCommon = styled.View`
    width: ${( props: IndexStyledProps ) => ( props.width ? props.width : 'null' )};
    height: ${( props: IndexStyledProps ) => ( props.height ? props.height : 'null' )};
    flex: ${( props: IndexStyledProps ) => ( props.flex ?? 'none' )};
    background-color: ${( props: IndexStyledProps ) => ( props.bgColor ?? 'transparent' )};
    border-radius: ${borderRadius2};
    elevation: ${( props: IndexStyledProps ) => ( props.shadow ? `${shadow.elevation}` : '0' )};
    box-shadow: ${( props: IndexStyledProps ) => ( props.shadow ? `${shadow.boxShadow}` : 'none' )};
    shadow-opacity: ${( props: IndexStyledProps ) => ( props.shadow ? `${shadow.shadowOpacity}` : '0' )};

    flex-direction: ${( props: AlignmentsStyledProps ) => ( props.flexDirection ?? 'column' )};
    justify-content: ${( props: AlignmentsStyledProps ) => ( props.justifyContent ?? 'flex-start' )};
    align-items: ${( props: AlignmentsStyledProps ) => ( props.alignItems ?? 'flex-start' )};

    margin-top: ${( props: MarginsStyledProps ) => (props.mt ?? 0)};
    margin-left: ${( props: MarginsStyledProps ) => (props.ml ?? 0)};
    margin-right: ${( props: MarginsStyledProps ) => (props.mr ?? 0)};
    margin-bottom: ${( props: MarginsStyledProps ) => (props.mb ?? 0)};

    padding-top: ${( props: PaddingsStyledProps ) => (props.pt ?? 0)};
    padding-left: ${( props: PaddingsStyledProps ) => (props.pl ?? 0)};
    padding-right: ${( props: PaddingsStyledProps ) => (props.pr ?? 0)};
    padding-bottom: ${( props: PaddingsStyledProps ) => (props.pb ?? 0)};

    top: ${( props: PositionStyledProps ) => (props.top ?? 0)};
    left: ${( props: PositionStyledProps ) => (props.left ?? 0)};
    right: ${( props: PositionStyledProps ) => (props.right ?? 0)};
    bottom: ${( props: PositionStyledProps ) => (props.bottom ?? 0)};
`

export default BoxCommon;