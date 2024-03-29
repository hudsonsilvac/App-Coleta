export type IndexType = {
    codMotorista?: string;
}

export type AddType = {
    itens: ItemsType[]
    codOrdemColeta: string
    DTULAlteracao: string
    qtTotalColetada: string
    qtItensColetados: string
    qtItensPrevistos: string
    vlTotal: string
    qtPrevista: string
    dtHoraColeta: string
    data: string
    dtHoraStatus: string
    pesoColeta: string
    vlColeta: string
    numCar: string
}

export type ItemsType = {
    codProd: string;
    quantidade: string;
    pCompra: string;
    qtPrevista: string;
}

export type KMType = {
    codMotorista: string;
    kmInicial?: string;
    dtHoraStatus?: string;
}

export interface CollectionProps {
    CODORDEMCOLETA: string
    CODFILIAL: string
    FILIAL: string
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

export interface KMProps {
    status: boolean;
    mensagem: string;
}