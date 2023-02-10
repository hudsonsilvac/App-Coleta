import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import { black, normal, success, warning } from "../../atomic/constants/colors";
import Main from "../../atomic/atoms/main";
import { BoxValueType } from "../../atomic/molecules/boxValue/models";

import View from "./view";
import { ListDataType } from "../../atomic/atoms/list/models";

const ProviderToCollect: BoxValueType[] = [
    {
        id: 0,
        text: 'Premium Carnes',
        value: {
            description: 'PC',
            state: 'normal'
        }
    },
    {
        id: 1,
        text: 'Tatico / Rec das Emas',
        value: {
            description: 'TA',
            state: 'normal'
        }
    },
]

const ProviderCollected: BoxValueType[] = [
    {
        id: 2,
        text: 'Tradição Carnes',
        value: {
            description: 'TC',
            state: 'success'
        }
    },
    {
        id: 3,
        text: 'Supermercado Quibom',
        value: {
            description: 'SQ',
            state: 'success'
        }
    },
    {
        id: 4,
        text: 'Casa de Carnes JR 02',
        value: {
            description: 'JR',
            state: 'success'
        }
    },
    {
        id: 5,
        text: 'Supermercado Ponto Certo',
        value: {
            description: 'PC',
            state: 'success'
        }
    },
]

const ProviderDisabled: BoxValueType[] = [
    {
        id: 6,
        text: 'Casa de Carnes JR 02',
        value: {
            description: 'JR',
            state: 'disabled'
        }
    },
]

const List: ListDataType[] = [
    {
        id: 0,
        text: 'Todos',
        selected: black
    },
    {
        id: 1,
        text: 'A Coletar',
        selected: normal
    },
    {
        id: 2,
        text: 'Coletados',
        selected: success
    },
    {
        id: 3,
        text: 'Indisponíveis',
        selected: warning
    }
]

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [search, setSearch] = useState<string>('')
    const [listItemSelected, setListItemSelected] = useState<number>(0)

    const providerData = (id: string | number) => {
        navigation.navigate('Collect', { id })
    }

    return (
        <Main padding statusBar={{ barStyle: 'dark-content' }}>
            <View
                user='Glaziani'
                search={search}
                setSearch={setSearch}
                providersToCollect={ProviderToCollect}
                providersCollected={ProviderCollected}
                providersDisabled={ProviderDisabled}
                providerData={providerData}
                list={List}
                listItemSelected={listItemSelected}
                setListItemSelected={setListItemSelected}
            />
        </Main>
    )
}

export default Home