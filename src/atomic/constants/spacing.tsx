import { StyledProps } from "styled-components";

export interface Margins {
    mt?: string | number;
    ml?: string | number;
    mr?: string | number;
    mb?: string | number;
}

export type MarginsStyledProps = StyledProps<{
    mt?: string | number;
    ml?: string | number;
    mr?: string | number;
    mb?: string | number;
}>

export interface Padding {
    pt?: string | number;
    pl?: string | number;
    pr?: string | number;
    pb?: string | number;
}

export type PaddingsStyledProps = StyledProps<{
    pt?: string | number;
    pl?: string | number;
    pr?: string | number;
    pb?: string | number;
}>

export interface Position {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
}

export type PositionStyledProps = StyledProps<{
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
}>