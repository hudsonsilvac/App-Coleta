import React, { useState } from "react";
import Background from "../../atomic/atoms/background";

import { white } from "../../atomic/constants/colors";
import { currency } from "../../constants/formats";

import Main from "../../atomic/atoms/main";
import Text from "../../atomic/atoms/text";
import Button from "../../atomic/molecules/button";
import BoxCommon from "../../atomic/atoms/boxes/boxCommon";
import { ItemType } from "../../atomic/organisms/item/models";

import { RouteProp, useRoute } from "@react-navigation/native";
import { StackProps } from "../../routes/models";

import Bg from '../../assets/background/splashCollect.png'

import View from "./view";

const Items: ItemType[] = [
    {
        id: 0,
        description: 'Osso',
        prevision: '600',
        value: '',
    },
    {
        id: 1,
        description: 'Muxiba',
        prevision: '200',
        value: '',
    },
    {
        id: 2,
        description: 'Resíduos Abate',
        prevision: '400',
        value: '',
    },
    {
        id: 3,
        description: 'Gordura',
        prevision: '800',
        value: '',
    },
    {
        id: 4,
        description: 'Sangue',
        prevision: '1000',
        value: '',
    },
]

const Collect: React.FC = () => {
    const route = useRoute<RouteProp<StackProps, 'Collect'>>().params;

    const [items, setItems] = useState<ItemType[]>(Items)

    return (
        <Main>
            <Background source={Bg} small justifyContent='space-between'>
                <BoxCommon width='100%' mt='60px' mb='30px'>
                    <Button type='back' onPress={() => null} />
                </BoxCommon>
                <BoxCommon alignItems='center'>
                    <Text
                        type='H2'
                        text='Premium Carnes'
                        align='center'
                        color={white}
                        ml='10px'
                        mr='10px'
                    />
                    <Text
                        type='H4'
                        text='Ceilândia Sul - Brasília'
                        align='center'
                        color={white}
                    />
                </BoxCommon>
                <BoxCommon />
            </Background>
            <View
                address='QNP 30 Conjunto A'
                phone='(61) 9 8558-8404'
                items={items}
                setItems={setItems}
                total={currency(items.reduce((valor, total) => Number(valor) + Number(total.value), 0), 2, 3, '.', ',')}
            />
        </Main>
    )
}

export default Collect;