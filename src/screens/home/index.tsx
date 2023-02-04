import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import Main from "../../atomic/atoms/main";
import { BoxValueType } from "../../atomic/molecules/boxValue/models";

import View from "./view";

const CustomerToCollect: BoxValueType[] = [
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

const CustomerCollected: BoxValueType[] = [
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

const Home: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [search, setSearch] = useState<string>('')

    const customerData = (id: string | number) => {
        navigation.navigate('Collect', { id })
    }

    return (
        <Main padding statusBar={{ barStyle: 'dark-content' }}>
            <View
                user='Glaziani'
                search={search}
                setSearch={setSearch}
                customersToCollect={CustomerToCollect}
                customersCollected={CustomerCollected}
                customerData={customerData}
            />
        </Main>
    )
}

export default Home