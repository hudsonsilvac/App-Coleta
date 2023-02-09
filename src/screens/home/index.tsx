import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import Main from "../../atomic/atoms/main";
import { BoxValueType } from "../../atomic/molecules/boxValue/models";

import View from "./view";

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

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [search, setSearch] = useState<string>('')

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
            />
        </Main>
    )
}

export default Home