import { ResultSet, Transaction } from 'react-native-sqlite-storage';
import db from '..';
import { CollectionProps, IndexType } from './models';

db.transaction((tx: Transaction) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
        'Collections ' +
        '(ID INTEGER PRIMARY KEY NOT NULL, ' +
        'CODFILIAL TEXT, ' +
        'FILIAL TEXT, ' +
        'CODFORNEC TEXT,' +
        'CODORDEMCOLETA TEXT, ' +
        'DTCOLETA TEXT, ' +
        'DTULTALTERACAO TEXT, ' +
        'FORNECEDOR TEXT, ' +
        'POSICAO TEXT, ' +
        'BAIRRO TEXT, ' +
        'CIDADE_ESTADO TEXT, ' +
        'ENDERECO TEXT, ' +
        'TELEFONE TEXT, ' +
        'QTTOTALCOLETADA TEXT, ' +
        'VLTOTAL TEXT, ' +
        'TIPO TEXT)',
        [],
        () => (null)
    )
})

const listSuccess = () => {
    return new Promise<CollectionProps[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'SELECT * FROM Collections WHERE TIPO = ?',
                ['1'],
                (tx: Transaction, result: ResultSet) => {
                    if (result.rows.length > 0) {
                        var array: CollectionProps[] = []
                        for (let i = 0; i < result.rows.length; i++) {
                            let json = {
                                CODFILIAL: result.rows.item(i).CODFILIAL,
                                FILIAL: result.rows.item(i).FILIAL,
                                CODFORNEC: result.rows.item(i).CODFORNEC,
                                CODORDEMCOLETA: result.rows.item(i).CODORDEMCOLETA,
                                DTCOLETA: result.rows.item(i).DTCOLETA,
                                DTULTALTERACAO: result.rows.item(i).DTULTALTERACAO,
                                FORNECEDOR: result.rows.item(i).FORNECEDOR,
                                POSICAO: result.rows.item(i).POSICAO,
                                BAIRRO: result.rows.item(i).BAIRRO,
                                CIDADE_ESTADO: result.rows.item(i).CIDADE_ESTADO,
                                ENDERECO: result.rows.item(i).ENDERECO,
                                TELEFONE: result.rows.item(i).TELEFONE,
                                QTTOTALCOLETADA: result.rows.item(i).QTTOTALCOLETADA,
                                VLTOTAL: result.rows.item(i).VLTOTAL,
                                TIPO: result.rows.item(i).TIPO,
                            }
                            array.push(json)
                        }
                        resolve(array)
                    } else reject('ERROR')
                }
            )
        })
    })
}

const listToCollect = () => {
    return new Promise<CollectionProps[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'SELECT * FROM Collections WHERE TIPO = ?',
                ['2'],
                (tx: Transaction, result: ResultSet) => {
                    if (result.rows.length > 0) {
                        var array: CollectionProps[] = []
                        for (let i = 0; i < result.rows.length; i++) {
                            let json = {
                                CODFILIAL: result.rows.item(i).CODFILIAL,
                                FILIAL: result.rows.item(i).FILIAL,
                                CODFORNEC: result.rows.item(i).CODFORNEC,
                                CODORDEMCOLETA: result.rows.item(i).CODORDEMCOLETA,
                                DTCOLETA: result.rows.item(i).DTCOLETA,
                                DTULTALTERACAO: result.rows.item(i).DTULTALTERACAO,
                                FORNECEDOR: result.rows.item(i).FORNECEDOR,
                                POSICAO: result.rows.item(i).POSICAO,
                                BAIRRO: result.rows.item(i).BAIRRO,
                                CIDADE_ESTADO: result.rows.item(i).CIDADE_ESTADO,
                                ENDERECO: result.rows.item(i).ENDERECO,
                                TELEFONE: result.rows.item(i).TELEFONE,
                                QTTOTALCOLETADA: result.rows.item(i).QTTOTALCOLETADA,
                                VLTOTAL: result.rows.item(i).VLTOTAL,
                                TIPO: result.rows.item(i).TIPO,
                            }
                            array.push(json)
                        }
                        resolve(array)
                    } else reject('ERROR')
                }
            )
        })
    })
}

const listToDo = () => {
    return new Promise<CollectionProps[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'SELECT * FROM Collections WHERE TIPO = ?',
                ['3'],
                (tx: Transaction, result: ResultSet) => {
                    if (result.rows.length > 0) {
                        var array: CollectionProps[] = []
                        for (let i = 0; i < result.rows.length; i++) {
                            let json = {
                                CODFILIAL: result.rows.item(i).CODFILIAL,
                                FILIAL: result.rows.item(i).FILIAL,
                                CODFORNEC: result.rows.item(i).CODFORNEC,
                                CODORDEMCOLETA: result.rows.item(i).CODORDEMCOLETA,
                                DTCOLETA: result.rows.item(i).DTCOLETA,
                                DTULTALTERACAO: result.rows.item(i).DTULTALTERACAO,
                                FORNECEDOR: result.rows.item(i).FORNECEDOR,
                                POSICAO: result.rows.item(i).POSICAO,
                                BAIRRO: result.rows.item(i).BAIRRO,
                                CIDADE_ESTADO: result.rows.item(i).CIDADE_ESTADO,
                                ENDERECO: result.rows.item(i).ENDERECO,
                                TELEFONE: result.rows.item(i).TELEFONE,
                                QTTOTALCOLETADA: result.rows.item(i).QTTOTALCOLETADA,
                                VLTOTAL: result.rows.item(i).VLTOTAL,
                                TIPO: result.rows.item(i).TIPO,
                            }
                            array.push(json)
                        }
                        resolve(array)
                    } else reject('ERROR')
                }
            )
        })
    })
}

const insert = ({ CODFILIAL, FILIAL, CODFORNEC, CODORDEMCOLETA, DTCOLETA, DTULTALTERACAO, FORNECEDOR,
                POSICAO, BAIRRO, CIDADE_ESTADO, ENDERECO, TELEFONE, QTTOTALCOLETADA,
                VLTOTAL, TIPO }: IndexType) => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                `INSERT INTO Collections
                    (CODFILIAL, FILIAL, CODFORNEC, CODORDEMCOLETA, DTCOLETA, DTULTALTERACAO, FORNECEDOR,
                    POSICAO, BAIRRO, CIDADE_ESTADO, ENDERECO, TELEFONE, QTTOTALCOLETADA,
                    VLTOTAL, TIPO)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?,
                    ?, ?)
                `,
                [CODFILIAL, FILIAL, CODFORNEC, CODORDEMCOLETA, DTCOLETA, DTULTALTERACAO, FORNECEDOR,
                POSICAO, BAIRRO, CIDADE_ESTADO, ENDERECO, TELEFONE, QTTOTALCOLETADA,
                VLTOTAL, TIPO],
                (tx: Transaction, result: ResultSet) => result.rowsAffected > 0 ? resolve(true) : reject(false)
            )
        })
    })
}

const update = ({ TIPO, DTCOLETA, DTULTALTERACAO, CODFORNEC }: IndexType) => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                `UPDATE
                    Collections
                SET
                    TIPO = ?,
                    DTCOLETA = ?,
                    DTULTALTERACAO = ?
                WHERE
                    CODFORNEC = ?
                `,
                [TIPO, DTCOLETA, DTULTALTERACAO, CODFORNEC],
                (tx: Transaction, result: ResultSet) => resolve(!!result.rows.length)
            )
        })
    })
}

const deleteAll = () => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'DELETE FROM Collections',
                [],
                (tx: Transaction, result: ResultSet) => resolve(!!result.rows.length)
            )
        })
    })
}

export default {
    listSuccess,
    listToCollect,
    listToDo,
    insert,
    update,
    deleteAll,
}