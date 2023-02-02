import { StyledProps } from "styled-components"

export interface IndexProps {
    text: string;
    value: StateType;
}

type StateType = {
    state: 'normal' | 'success'
    description: string;
}

export type IndexStyledProps = StyledProps<IndexProps>