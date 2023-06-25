export type IndexType = {
    CODORDEMCOLETA: string
    CODFILIAL: string
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
    TIPO: '1' | '2' | '3'
}

export interface CollectionProps {
    CODORDEMCOLETA: string
    CODFILIAL: string
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
}