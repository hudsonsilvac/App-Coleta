import { IndexProps } from "./models";

const initialState: IndexProps = {
    data: {
        CODORDEMCOLETA: '',
        CODFILIAL: '',
        DTCOLETA: '',
        CODFORNEC: '',
        FORNECEDOR: '',
        POSICAO: '',
        DTULTALTERACAO: '',
        QTTOTALCOLETADA: '',
        VLTOTAL: '',
    }
};

export default (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_SUPPLIER_DATA':
            return { ...state, data: action.payload.data };
    }

    return state;
}