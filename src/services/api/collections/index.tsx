import api from '../../api/index'
import { IndexType, CollectionProps, AddType } from './models'

const listToCollect = ({ codMotorista }: IndexType) => {
    return new Promise<CollectionProps[]>(async (resolve, reject) => {
        await api.post('coletas/coletas-nao-iniciadas.php', { codMotorista })
        .then(response => {
            let res:CollectionProps[] = response.data.coletasNaoIniciadas
            let array:CollectionProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: CollectionProps = {
                    CODFILIAL: res[i].CODFILIAL,
                    CODFORNEC: res[i].CODFORNEC,
                    CODORDEMCOLETA: res[i].CODORDEMCOLETA,
                    DTCOLETA: res[i].DTCOLETA,
                    DTULTALTERACAO: res[i].DTULTALTERACAO,
                    FORNECEDOR: res[i].FORNECEDOR,
                    POSICAO: res[i].POSICAO,
                    BAIRRO: res[i].BAIRRO,
                    CIDADE_ESTADO: res[i].CIDADE_ESTADO,
                    ENDERECO: res[i].ENDERECO,
                    TELEFONE: res[i].TELEFONE,
                    QTTOTALCOLETADA: res[i].QTTOTALCOLETADA,
                    VLTOTAL: res[i].VLTOTAL
                }
                array.push(json)
            }
            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

const listToDo = ({ codMotorista }: IndexType) => {
    return new Promise<CollectionProps[]>(async (resolve, reject) => {
        await api.post('coletas/coletas-nao-realizadas.php', { codMotorista })
        .then(response => {
            let res:CollectionProps[] = response.data.coletasNaoRealizadas
            let array:CollectionProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: CollectionProps = {
                    CODFILIAL: res[i].CODFILIAL,
                    CODFORNEC: res[i].CODFORNEC,
                    CODORDEMCOLETA: res[i].CODORDEMCOLETA,
                    DTCOLETA: res[i].DTCOLETA,
                    DTULTALTERACAO: res[i].DTULTALTERACAO,
                    FORNECEDOR: res[i].FORNECEDOR,
                    POSICAO: res[i].POSICAO,
                    BAIRRO: res[i].BAIRRO,
                    CIDADE_ESTADO: res[i].CIDADE_ESTADO,
                    ENDERECO: res[i].ENDERECO,
                    TELEFONE: res[i].TELEFONE,
                    QTTOTALCOLETADA: res[i].QTTOTALCOLETADA,
                    VLTOTAL: res[i].VLTOTAL
                }
                array.push(json)
            }
            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

const listSuccess = ({ codMotorista }: IndexType) => {
    return new Promise<CollectionProps[]>(async (resolve, reject) => {
        await api.post('coletas/coletas-realizadas.php', { codMotorista })
        .then(response => {
            let res:CollectionProps[] = response.data.coletasRealizadas
            let array:CollectionProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: CollectionProps = {
                    CODFILIAL: res[i].CODFILIAL,
                    CODFORNEC: res[i].CODFORNEC,
                    CODORDEMCOLETA: res[i].CODORDEMCOLETA,
                    DTCOLETA: res[i].DTCOLETA,
                    DTULTALTERACAO: res[i].DTULTALTERACAO,
                    FORNECEDOR: res[i].FORNECEDOR,
                    POSICAO: res[i].POSICAO,
                    BAIRRO: res[i].BAIRRO,
                    CIDADE_ESTADO: res[i].CIDADE_ESTADO,
                    ENDERECO: res[i].ENDERECO,
                    TELEFONE: res[i].TELEFONE,
                    QTTOTALCOLETADA: res[i].QTTOTALCOLETADA,
                    VLTOTAL: res[i].VLTOTAL
                }
                array.push(json)
            }
            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

const addItem = ({ itens, codOrdemColeta, DTULAlteracao, qtTotalColetada, qtItensColetados, qtItensPrevistos, vlTotal, qtPrevista,
                dtHoraColeta, data, dtHoraStatus, pesoColeta, vlColeta, numCar }: AddType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('coletas/add-item-ordem-coleta.php', { itens, codOrdemColeta, DTULAlteracao, qtTotalColetada, qtItensColetados, qtItensPrevistos, vlTotal, qtPrevista,
            dtHoraColeta, data, dtHoraStatus, pesoColeta, vlColeta, numCar })
        .then(response => resolve(response))
        .catch((response) => reject(response))
    })
}

export default {
    listToDo,
    listToCollect,
    listSuccess,
    addItem
}