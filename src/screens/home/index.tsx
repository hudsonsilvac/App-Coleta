import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import { black, normal, primary, success } from "../../atomic/constants/colors";
import Main from "../../atomic/atoms/main";
import { ListDataType } from "../../atomic/atoms/list/models";

import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import { LoginTypes } from "../../services/redux/reducers/login/models";

import DBCollections from '../../services/sqlite/collections'
import DBProducts from '../../services/sqlite/products'
import { ProductsProps } from "../../services/sqlite/products/models";

import NetInfo from "@react-native-community/netinfo";

import { IndexProps } from "./models";
import View from "./view";
import collections from "../../services/api/collections";
import { Alert } from "react-native";
import { sincronizeDB } from "../../constants/sincronize";
import { ItemsType } from "../../services/api/collections/models";
import { getTimeCurrent } from "../../constants/date";

const List: ListDataType[] = [
    {
        id: 0,
        text: 'Todos',
        selected: black
    },
    {
        id: 1,
        text: 'Realizadas',
        selected: success
    },
    {
        id: 2,
        text: 'Não iniciadas',
        selected: normal
    },
    {
        id: 3,
        text: 'Não realizadas',
        selected: primary
    },
]

const delay = 5;

const Home: React.FC<IndexProps> = ({
    dataUser,
    setSupplierData,
    lastCollect,
    setLastCollect,
    setLoginData
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [search, setSearch] = useState<string>('')
    const [listItemSelected, setListItemSelected] = useState<number>(0)

    const providerData = (item: SuppliersTypes['data']) => {
        setSupplierData(item)
        navigation.navigate('Collect')
    }

    const [supplierToCollect, setSupplierToCollect] = useState<SuppliersTypes['data'][]>([])
    const [supplierToDo, setSupplierToDo] = useState<SuppliersTypes['data'][]>([])
    const [supplierSuccess, setSupplierSuccess] = useState<SuppliersTypes['data'][]>([])

    const [showSincronize, setShowSincronize] = useState<boolean>(false)
    const [isSincronize, setIsSincronize] = useState<boolean>(false)

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
        })
    } ,[])

    useEffect(() => {
        let timerNet = setInterval(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected == false) setShowSincronize(false)
                else setShowSincronize(true)
            });
            syncAuto()
        }, delay * 1000);

        return () => clearInterval(timerNet)
    }, [dataUser])

    const syncAuto = () => {
        let time = Number(dataUser.hourSync.split(':')[0])
        let currentTime = Number(getTimeCurrent().split(':')[0])

        if (currentTime > time || currentTime <= 5) {
            setLoginData({
                id: dataUser.id,
                name: dataUser.name,
                dateLogin: dataUser.dateLogin,
                numCar: dataUser.numCar,
                idStore: dataUser.idStore,
                hourSync: getTimeCurrent()
            })

            sincronize(false)
            setTimeout(() => {
                sincronize(true)
            }, 3000);
        }
    }

    const sincronize = (receive: boolean) => {
        if (isSincronize)
            return

        if (!receive)
            setIsSincronize(true)

        DBCollections.listSuccess()
        .then(async (data: SuppliersTypes['data'][]) => {
            data.map(item => {
                let codOrdemColeta: string, DTULAlteracao: string, dtHoraColeta: string, data: string, dtHoraStatus: string, numCar: string
                let qtTotalColetada: string, qtItensColetados: string, qtItensPrevistos: string, qtPrevista: string, pesoColeta: string
                let vlTotal: string, vlColeta: string, newItems: ItemsType[]
                
                Promise.all([
                    DBProducts.listAll({ CODFORNEC: item.CODFORNEC })
                    .then((dataP: ProductsProps[]) => {
                        codOrdemColeta = item.CODORDEMCOLETA
                        DTULAlteracao = item.DTULTALTERACAO
                        dtHoraColeta = item.DTCOLETA
                        data = item.DTCOLETA
                        dtHoraStatus = item.DTCOLETA
                        numCar = dataUser.numCar

                        qtTotalColetada = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))
                        qtItensColetados = String(dataP.reduce((accumulattor, total) => Number(total) > 0 ? Number(accumulattor) + 1 : 1, 0))
                        qtItensPrevistos = String(dataP.length)
                        qtPrevista = String(dataP.reduce((valor, total) => Number(valor) + Number(total.QTPREVISAO), 0))
                        pesoColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))

                        vlTotal = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))
                        vlColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))

                        newItems = dataP.map(item => ({
                            codProd: String(item.CODPROD),
                            quantidade: item.COLETA,
                            pCompra: item.PCOMPRA,
                            qtPrevista: item.QTPREVISAO,
                        }))
                
                    })
                ]).then(() => {
                    collections.addItem({
                        itens: newItems,
                        codOrdemColeta,
                        DTULAlteracao,
                        qtTotalColetada,
                        qtItensColetados,
                        qtItensPrevistos,
                        vlTotal,
                        qtPrevista,
                        dtHoraColeta,
                        data,
                        dtHoraStatus,
                        pesoColeta,
                        vlColeta,
                        numCar
                    })
                })
            })
        })

        if (receive) {
            DBCollections.deleteAll()
            DBProducts.deleteAll()
        }

        setTimeout(() => {
            if (receive) {
                sincronizeDB(dataUser.id, dataUser.idStore)
                setTimeout(() => {
                    setIsReceive(false)
                    Alert.alert('Sucesso', 'Dados recebidos com sucesso!')
                    setLastCollect('1')
                }, 10000);
            } else {
                Alert.alert('Sincronização', 'Sincronização concluída com sucesso!')
                setIsSincronize(false)
            }
        }, 10000);
    }

    const [isReceive, setIsReceive] = useState<boolean>(false)

    const toReceive = async () => {
        setIsReceive(true)
        sincronize(true)
    }

    useEffect(() => {
        loadData()
    }, [lastCollect])

    const loadData = () => {
        DBCollections.listToCollect()
        .then((data: SuppliersTypes['data'][]) => setSupplierToCollect(data))
        
        DBCollections.listToDo()
        .then((data: SuppliersTypes['data'][]) => setSupplierToDo(data))

        DBCollections.listSuccess()
        .then((data: SuppliersTypes['data'][]) => setSupplierSuccess(data))
    }

    return (
        <Main pd statusBar={{ barStyle: 'dark-content' }}>
            <View
                showSincronize={showSincronize}
                toReceive={toReceive}
                isReceive={isReceive}
                sincronize={() => sincronize(false)}
                isSincronize={isSincronize}
                user={dataUser.name.split(' ')[0]}
                search={search}
                setSearch={setSearch}
                providersToCollect={supplierToCollect}
                providersToDo={supplierToDo}
                providersSuccess={supplierSuccess}
                providerData={providerData}
                list={List}
                listItemSelected={listItemSelected}
                setListItemSelected={setListItemSelected}
            />
        </Main>
    )
}

const mapStateToProps = ({
    loginReducer,
    collectionsReducer,
}: {
    loginReducer: LoginTypes,
    collectionsReducer: CollectionsTypes,
}) => ({
    dataUser: loginReducer.data,
    lastCollect: collectionsReducer.lastCollect,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSupplierData: (data: SuppliersTypes['data']) => dispatch({ type: 'SET_SUPPLIER_DATA', payload: { data } }),
    setLastCollect: (data: CollectionsTypes['lastCollect']) => dispatch({ type: 'SET_COLLECT_LAST', payload: { data } }),
    setLoginData: (data: LoginTypes['data']) => dispatch({ type: 'SET_LOGIN_DATA', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);