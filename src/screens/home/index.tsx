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
import { CollectionProps } from "../../services/sqlite/collections/models";

import NetInfo from "@react-native-community/netinfo";

import { IndexProps } from "./models";
import View from "./view";
import collections from "../../services/api/collections";
import { Alert } from "react-native";

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
        let timerNet = setInterval(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected == false) setShowSincronize(false)
                else setShowSincronize(true)
            });
        }, delay * 1000);

        return () => clearInterval(timerNet)
    }, [])

    const sincronize = () => {
        if (isSincronize)
            return

        setIsSincronize(true)

        DBCollections.listSuccess()
        .then((data: CollectionProps[]) => {
            data.map(item => {
                DBProducts.listAll({ CODFORNEC: item.CODFORNEC })
                .then((dataP: ProductsProps[]) => {
                    let codOrdemColeta = item.CODORDEMCOLETA
                    let DTULAlteracao = item.DTULTALTERACAO
                    let dtHoraColeta = item.DTCOLETA
                    let data = item.DTCOLETA
                    let dtHoraStatus = item.DTCOLETA
                    let numCar = '0'

                    let qtTotalColetada = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))
                    let qtItensColetados = String(dataP.reduce((accumulattor, total) => Number(total) > 0 ? Number(accumulattor) + 1 : 1, 0))
                    let qtItensPrevistos = String(dataP.length)
                    let qtPrevista = String(dataP.reduce((valor, total) => Number(valor) + Number(total.QTPREVISAO), 0))
                    let pesoColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))

                    let vlTotal = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))
                    let vlColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))

                    let newItems = dataP.map(item => ({
                        codProd: String(item.CODPROD),
                        quantidade: item.COLETA,
                        pCompra: item.PCOMPRA,
                        qtPrevista: item.QTPREVISAO,
                    }))
            
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

        setTimeout(() => {
            Alert.alert('Sincronização', 'Sincronização concluída com sucesso!')
            setIsSincronize(false)
        }, 10000);
    }

    useEffect(() => {
        loadData()
    }, [lastCollect])

    const loadData = () => {
        DBCollections.listToCollect()
        .then((data: CollectionProps[]) => setSupplierToCollect(data))
        
        DBCollections.listToDo()
        .then((data: CollectionProps[]) => setSupplierToDo(data))

        DBCollections.listSuccess()
        .then((data: CollectionProps[]) => setSupplierSuccess(data))
    }

    return (
        <Main pd statusBar={{ barStyle: 'dark-content' }}>
            <View
                showSincronize={showSincronize}
                sincronize={sincronize}
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
    lastCollect: collectionsReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSupplierData: (data: SuppliersTypes['data']) => dispatch({ type: 'SET_SUPPLIER_DATA', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);