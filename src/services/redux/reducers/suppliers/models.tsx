export interface IndexProps {
    data: Data;
}

export type SuppliersTypes = IndexProps;

type Data = {
    CODORDEMCOLETA: string
    CODFILIAL: string
    DTCOLETA: string
    CODFORNEC: string
    FORNECEDOR: string
    POSICAO: string
    DTULTALTERACAO: string
    QTTOTALCOLETADA: string
    VLTOTAL: string
}