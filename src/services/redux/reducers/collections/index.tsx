import { IndexProps } from "./models";

const initialState: IndexProps = {
    lastCollect: '',
    sincronized: true
};

export default (state = initialState, action: { type: string, payload: IndexProps }) => {
    switch(action.type) {
        case 'RESET_COLLECT_LAST':
            return { ...state, lastCollect: initialState };
        case 'SET_COLLECT_LAST':
            return { ...state, lastCollect: action.payload.lastCollect };
        case 'SET_SINCRONIZED':
            return { ...state, sincronized: action.payload.sincronized };
        default:
            return state;
    }
}