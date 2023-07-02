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
        BAIRRO: '',
        CIDADE_ESTADO: '',
        ENDERECO: '',
        TELEFONE: '',
        TIPO: ''
    },
};

export default (state = initialState, action: { type: string, payload: IndexProps }) => {
    switch(action.type) {
        case 'RESET_SUPPLIER_DATA':
            return { ...state, data: initialState };
        case 'SET_SUPPLIER_DATA':
            return { ...state, data: action.payload.data };
        default:
            return state;
    }
}