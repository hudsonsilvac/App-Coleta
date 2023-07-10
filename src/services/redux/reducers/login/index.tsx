import { IndexProps } from "./models";

const initialState: IndexProps = {
    data: {
        id: '',
        name: '',
        dateLogin: '',
        numCar: ''
    }
};

export default (state = initialState, action: { type: string, payload: IndexProps }) => {
    switch(action.type) {
        case 'SET_LOGIN_DATA':
            return { ...state, data: action.payload.data };
        default:
            return state;
    }
}