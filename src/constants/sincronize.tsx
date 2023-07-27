import collections from "../services/api/collections"
import products from "../services/api/products"
import { CollectionProps } from "../services/api/collections/models"

import DBProducts from '../services/sqlite/products'
import DBCollections from '../services/sqlite/collections'
import { ProductsProps } from "../services/api/products/models"

export const sincronizeDB = (codMotorista: string, codFilial: string) => {
    collections.listSuccess({ codMotorista })
    .then((data: CollectionProps[]) => {
        if (data.length <= 0)
            return
        
        data.map(item => {
            DBCollections.insert({
                CODFILIAL: item.CODFILIAL,
                FILIAL: item.FILIAL,
                CODFORNEC: item.CODFORNEC,
                CODORDEMCOLETA: item.CODORDEMCOLETA,
                DTCOLETA: item.DTCOLETA,
                DTULTALTERACAO: item.DTULTALTERACAO,
                FORNECEDOR: item.FORNECEDOR,
                POSICAO: item.POSICAO,
                BAIRRO: item.BAIRRO,
                CIDADE_ESTADO: item.CIDADE_ESTADO,
                ENDERECO: item.ENDERECO,
                TELEFONE: item.TELEFONE,
                QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                TIPO: '1',
                VLTOTAL: item.VLTOTAL
            })
        })
    })

    collections.listToCollect({ codMotorista })
    .then((data: CollectionProps[]) => {
        if (data.length <= 0)
            return

        data.map(item => {
            DBCollections.insert({
                CODFILIAL: item.CODFILIAL,
                FILIAL: item.FILIAL,
                CODFORNEC: item.CODFORNEC,
                CODORDEMCOLETA: item.CODORDEMCOLETA,
                DTCOLETA: item.DTCOLETA,
                DTULTALTERACAO: item.DTULTALTERACAO,
                FORNECEDOR: item.FORNECEDOR,
                POSICAO: item.POSICAO,
                BAIRRO: item.BAIRRO,
                CIDADE_ESTADO: item.CIDADE_ESTADO,
                ENDERECO: item.ENDERECO,
                TELEFONE: item.TELEFONE,
                QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                TIPO: '2',
                VLTOTAL: item.VLTOTAL
            })
        })
    })
    
    collections.listToDo({ codMotorista })
    .then((data: CollectionProps[]) => {
        if (data.length <= 0)
            return
        
        data.map(item => {
            DBCollections.insert({
                CODFILIAL: item.CODFILIAL,
                FILIAL: item.FILIAL,
                CODFORNEC: item.CODFORNEC,
                CODORDEMCOLETA: item.CODORDEMCOLETA,
                DTCOLETA: item.DTCOLETA,
                DTULTALTERACAO: item.DTULTALTERACAO,
                FORNECEDOR: item.FORNECEDOR,
                POSICAO: item.POSICAO,
                BAIRRO: item.BAIRRO,
                CIDADE_ESTADO: item.CIDADE_ESTADO,
                ENDERECO: item.ENDERECO,
                TELEFONE: item.TELEFONE,
                QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                TIPO: '3',
                VLTOTAL: item.VLTOTAL
            })
        })
    })

    products.listAll({ codMotorista, codFilial })
    .then((data: ProductsProps[]) => {
        data.map(item => {
            DBProducts.insert({
                CODPROD: item.CODPROD,
                CODFORNEC: item.CODFORNEC,
                DESCRICAO: item.DESCRICAO,
                QTPREVISAO: item.QTPREVISAO,
                PCOMPRA: item.PCOMPRA,
                COLETA: item.COLETA
            })
        })
    })
}