import { IndexProps } from "./models";

const initialState: IndexProps = {
    data: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
    }
};

export default (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_SUPPLIER_DATA':
            return{...state, data: action.payload.data};
            break;
    }

    return state;
}