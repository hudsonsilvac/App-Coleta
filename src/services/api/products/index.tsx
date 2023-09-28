import api from '../index'
import { IndexType, ProductsProps } from './models'

const listAll = ({ codMotorista, codFilial }: IndexType) => {
    return new Promise<ProductsProps[]>(async (resolve, reject) => {
        await api.post('produtos/produtos-habilitados-para-coleta.php', { codMotorista, codFilial })
        .then(response => {
            let res:ProductsProps[] = response.data.produtosHabilitados
            let array:ProductsProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: ProductsProps = {
                    CODPROD: res[i].CODPROD,
                    CODFORNEC: res[i].CODFORNEC,
                    COLETA: res[i].QTCOLETADA || '0',
                    DESCRICAO: res[i].DESCRICAO,
                    PCOMPRA: res[i].PCOMPRA,
                    QTPREVISAO: res[i].QTPREVISAO
                }
                array.push(json)
            }
            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

export default {
    listAll,
}