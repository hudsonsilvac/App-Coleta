import { ResultSet, Transaction } from 'react-native-sqlite-storage';
import db from '..';
import { ProductsProps, IndexType } from './models';

db.transaction((tx: Transaction) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
        'Products ' +
        '(ID INTEGER PRIMARY KEY NOT NULL, ' +
        'CODPROD TEXT,' +
        'CODFORNEC TEXT, ' +
        'DESCRICAO TEXT, ' +
        'QTPREVISAO TEXT, ' +
        'PCOMPRA TEXT, ' +
        'COLETA TEXT)',
        [],
        () => (null)
    )
})

const listAll = ({ CODFORNEC }: IndexType) => {
    return new Promise<ProductsProps[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'SELECT * FROM Products WHERE CODFORNEC = ?',
                [CODFORNEC],
                (tx: Transaction, result: ResultSet) => {
                    if (result.rows.length > 0) {
                        var array: ProductsProps[] = []
                        for (let i = 0; i < result.rows.length; i++) {
                            let json = {
                                CODPROD: result.rows.item(i).CODPROD,
                                CODFORNEC: result.rows.item(i).CODFORNEC,
                                DESCRICAO: result.rows.item(i).DESCRICAO,
                                QTPREVISAO: result.rows.item(i).QTPREVISAO || '0',
                                PCOMPRA: result.rows.item(i).PCOMPRA || '0',
                                COLETA: result.rows.item(i).COLETA || '0',
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

const insert = ({ CODFORNEC, CODPROD, COLETA, DESCRICAO, PCOMPRA, QTPREVISAO }: IndexType) => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                `INSERT INTO Products
                    (CODFORNEC, CODPROD, COLETA, DESCRICAO, PCOMPRA, QTPREVISAO)
                VALUES
                    (?, ?, ?, ?, ?, ?)
                `,
                [CODFORNEC, CODPROD, COLETA, DESCRICAO, PCOMPRA, QTPREVISAO],
                (tx: Transaction, result: ResultSet) => result.rowsAffected > 0 ? resolve(true) : reject(false)
            )
        })
    })
}

const update = ({ CODFORNEC, CODPROD, COLETA }: IndexType) => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                `UPDATE
                    Products
                SET
                    COLETA = ?
                WHERE
                    CODFORNEC = ?
                AND CODPROD = ?
                `,
                [COLETA, CODFORNEC, CODPROD],
                (tx: Transaction, result: ResultSet) => result.rowsAffected > 0 ? resolve(true) : reject(false)
            )
        })
    })
}

const deleteAll = () => {
    return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
            tx.executeSql(
                'DELETE FROM Products',
                [],
                (tx: Transaction, result: ResultSet) => resolve(!!result.rows.length)
            )
        })
    })
}

export default {
    listAll,
    insert,
    update,
    deleteAll
}