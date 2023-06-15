export type IndexType = {
    codMotorista?: string;
}

export type AddType = {
    items: ItemsType[]
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
    qtColetasReal: string
    pesoColeta: string
    vlColeta: string
    numCar: string
}

type ItemsType = {
    codProd: string;
    quantidade: string;
    pCompra: string;
    qtPrevista: string;
}

export interface CollectionProps {
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