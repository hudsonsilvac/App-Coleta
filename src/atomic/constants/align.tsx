import { StyledProps } from "styled-components";

export type FlexDirection = 'row' | 'column'
export type JustifyContent = 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'center'
export type AlignItems = 'flex-start' | 'flex-end' | 'center'

export type Alignments = {
    flexDirection?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
}

export type AlignmentsStyledProps = StyledProps<Alignments>