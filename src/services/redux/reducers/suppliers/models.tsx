export interface IndexProps {
    data: Data;
}

export type SuppliersTypes = IndexProps;

type Data = {
    CODORDEMCOLETA: string
    CODFILIAL: string
    FILIAL: string;
    DTCOLETA: string
    CODFORNEC: string
    FORNECEDOR: string
    POSICAO: string
    TELEFONE: string;
    ENDERECO: string;
    BAIRRO: string;
    CIDADE_ESTADO: string;
    DTULTALTERACAO: string
    QTTOTALCOLETADA: string
    VLTOTAL: string
    TIPO: string;
}