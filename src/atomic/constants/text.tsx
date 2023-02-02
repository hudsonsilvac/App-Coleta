import { StyledProps } from "styled-components";

export const spacing = '2px';
export type TextAlign = 'left' | 'center' | 'right';
export type TextWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export type TextWeightStyledProps = StyledProps<{
    weight: TextWeight;
}>