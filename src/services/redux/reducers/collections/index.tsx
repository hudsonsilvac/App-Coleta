import { IndexProps } from "./models";

const initialState: IndexProps = {
    lastCollect: '012'
};

export default (state = initialState, action: { type: string, payload: IndexProps }) => {
    switch(action.type) {
        case 'RESET_COLLECT_LAST':
            return { ...state, data: initialState };
        case 'SET_COLLECT_LAST':
            return { ...state, data: action.payload.lastCollect };
        default:
            return state;
    }
}