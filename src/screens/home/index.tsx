import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import { black, normal, primary, success } from "../../atomic/constants/colors";
import Main from "../../atomic/atoms/main";
import { BoxValueType } from "../../atomic/molecules/boxValue/models";

import { ListDataType } from "../../atomic/atoms/list/models";
import collections from "../../services/api/collections";

import View from "./view";
import { CollectionProps } from "../../services/api/collections/models";
import { boxID } from "../../constants/formats";

const List: ListDataType[] = [
    {
        id: 0,
        text: 'Todos',
        selected: black
    },
    {
        id: 1,
        text: 'Não iniciadas',
        selected: normal
    },
    {
        id: 2,
        text: 'A fazer',
        selected: primary
    },
    {
        id: 3,
        text: 'Realizadas',
        selected: success
    }
]

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [search, setSearch] = useState<string>('')
    const [listItemSelected, setListItemSelected] = useState<number>(0)

    const providerData = (id: string | number) => {
        navigation.navigate('Collect', { id })
    }

    const [supplierToCollect, setSupplierToCollect] = useState<BoxValueType[]>([])
    const [supplierToDo, setSupplierToDo] = useState<BoxValueType[]>([])
    const [supplierSuccess, setSupplierSuccess] = useState<BoxValueType[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        collections.listToCollect({ codMotorista: '102' })
        .then((data: CollectionProps[]) => {
            let dataCollect = data.map(item => ({
                id: item.CODORDEMCOLETA,
                text: item.FORNECEDOR,
                value: {
                    description: boxID(item.FORNECEDOR),
                    state: 'normal'
                }
            }))
            setSupplierToCollect(dataCollect)
        })
        
        collections.listToDo({ codMotorista: '102' })
        .then((data: CollectionProps[]) => {
            let dataCollect = data.map(item => ({
                id: item.CODORDEMCOLETA,
                text: item.FORNECEDOR,
                value: {
                    description: boxID(item.FORNECEDOR),
                    state: 'primary'
                }
            }))
            setSupplierToDo(dataCollect)
        })

        collections.listSuccess({ codMotorista: '102' })
        .then((data: CollectionProps[]) => {
            let dataCollect = data.map(item => ({
                id: item.CODORDEMCOLETA,
                text: item.FORNECEDOR,
                value: {
                    description: boxID(item.FORNECEDOR),
                    state: 'success'
                }
            }))
            setSupplierSuccess(dataCollect)
        })
    }

    return (
        <Main pd statusBar={{ barStyle: 'dark-content' }}>
            <View
                user='Glaziani'
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

export default Home