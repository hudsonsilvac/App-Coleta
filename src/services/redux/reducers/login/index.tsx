import { IndexProps } from "./models";

const initialState: IndexProps = {
    data: {
        id: '',
        name: '',
    }
};

export default (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_LOGIN_TOKEN':
            return{...state, token: action.payload.token};
            break;
        case 'SET_LOGIN_DATA':
            return{...state, data: action.payload.data};
            break;
    }

    return state;
}