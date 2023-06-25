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

import collections from "../../services/api/collections";
import { CollectionProps } from "../../services/api/collections/models";


import { IndexProps } from "./models";
import View from "./view";
import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import reactotron from "reactotron-react-native";
import { LoginTypes } from "../../services/redux/reducers/login/models";

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

const Home: React.FC<IndexProps> = ({
    dataUser,
    setSupplierData,
    setReset,
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

    useEffect(() => {
        // setReset()
        reactotron.warn!!(lastCollect)
        loadData()
    }, [lastCollect])

    const loadData = () => {
        collections.listToCollect({ codMotorista: dataUser.id })
        .then((data: CollectionProps[]) => setSupplierToCollect(data))
        
        collections.listToDo({ codMotorista: dataUser.id })
        .then((data: CollectionProps[]) => setSupplierToDo(data))

        collections.listSuccess({ codMotorista: dataUser.id })
        .then((data: CollectionProps[]) => setSupplierSuccess(data))
    }

    return (
        <Main pd statusBar={{ barStyle: 'dark-content' }}>
            <View
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
    lastCollect: collectionsReducer.lastCollect
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSupplierData: (data: SuppliersTypes['data']) => dispatch({ type: 'SET_SUPPLIER_DATA', payload: { data } }),
    setReset: (data) => dispatch({ type: 'RESET_COLLECT_LAST', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);