export type IndexType = {
    codigoFornecedor?: string;
    codigoFilial?: string;
}

export interface ProductsProps {
    CODPROD: string | number;
    DESCRICAO: string;
    QTPREVISAO: string;
    PCOMPRA: string;
    COLETA: string;
}