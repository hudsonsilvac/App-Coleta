import api from '../../api/index'
import { IndexType, CollectionProps } from './models'

const listToDo = ({ codMotorista }: IndexType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('coletas/coletas-a-fazer.php', { codMotorista })
        .then(response => {
            let res:CollectionProps[] = response.data.coletasNaoRealizadas
            let array:CollectionProps[] = []

            for (let i = 0; i < res.length; i++ ) {
                let json: CollectionProps = {
                    CODFILIAL: res[i].CODFILIAL,
                    CODFORNEC: res[i].CODFORNEC,
                    CODORDEMCOLETA: res[i].CODORDEMCOLETA,
                    DTCOLETA: res[i].DTCOLETA,
                    DTULTALTERACAO: res[i].DTULTALTERACAO,
                    FORNECEDOR: res[i].FORNECEDOR,
                    POSICAO: res[i].POSICAO,
                    QTTOTALCOLETADA: res[i].QTTOTALCOLETADA,
                    VLTOTAL: res[i].VLTOTAL
                }
                array.push(json)
            }
            resolve(array)
        })
        .catch((response) => reject(response))
    })
}

const notStarted = ({ codMotorista }: IndexType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('coletas/coletas-nao-iniciadas.php', { codMotorista })
        .then(response => {
            let res:CollectionProps[] = response.data.suppliers
            let array:CollectionProps[] = []

            for (let i = 0; i < res.length; i++ ) {
                let json: CollectionProps = {
                    CODFILIAL: res[i].CODFILIAL,
                    CODFORNEC: res[i].CODFORNEC,
                    CODORDEMCOLETA: res[i].CODORDEMCOLETA,
                    DTCOLETA: res[i].DTCOLETA,
                    DTULTALTERACAO: res[i].DTULTALTERACAO,
                    FORNECEDOR: res[i].FORNECEDOR,
                    POSICAO: res[i].POSICAO,
                    QTTOTALCOLETADA: res[i].QTTOTALCOLETADA,
                    VLTOTAL: res[i].VLTOTAL
                }
                array.push(json)
            }
            resolve(array)
        })
        .catch((response) => reject(response))
    })
}

export default {
    listToDo,
    notStarted
}