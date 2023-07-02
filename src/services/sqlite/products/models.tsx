export type IndexType = {
    CODFORNEC: string;
    CODPROD?: string | number;
    DESCRICAO?: string;
    QTPREVISAO?: string;
    PCOMPRA?: string;
    COLETA?: string;
}

export interface ProductsProps {
    CODPROD: string | number;
    CODFORNEC: string;
    DESCRICAO: string;
    QTPREVISAO: string;
    PCOMPRA: string;
    COLETA: string;
}