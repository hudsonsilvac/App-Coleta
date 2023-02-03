import React, { useEffect, useState } from "react";
import Background from "../../atomic/atoms/background";

import Main from "../../atomic/atoms/main";
import Text from "../../atomic/atoms/text";

import Bg from '../../assets/background/splashCollect.png'

import View from "./view";
import { white } from "../../atomic/constants/colors";
import Button from "../../atomic/molecules/button";
import BoxCommon from "../../atomic/atoms/boxes/boxCommon";
import { ItemType } from "../../atomic/organisms/item/models";
import { currency } from "../../constants/formats";

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
    const [items, setItems] = useState<ItemType[]>(Items)

    useEffect(() => {
        console.log(items)
    }, [items])

    return (
        <Main>
            <Background source={Bg} small justifyContent='space-between'>
                <BoxCommon width='100%' mt='60px' mb='30px'>
                    <Button type='back' onPress={() => null} />
                </BoxCommon>
                <BoxCommon alignItems='center'>
                    <Text
                        type='H2'
                        text='Casa de carnes 02 irmãos'
                        align='center'
                        color={white}
                        ml='10px'
                        mr='10px'
                    />
                    <Text
                        type='H4'
                        text='Ceilândia Norte - Brasília'
                        align='center'
                        color={white}
                    />
                </BoxCommon>
                <BoxCommon />
            </Background>
            <View
                address='HSN Chácara 1 Lt 1 Loja 03 Condomínio Sol Nascente 03'
                phone='(61) 9 9994-7188'
                items={items}
                setItems={setItems}
                total={currency(items.reduce((valor, total) => Number(valor) + Number(total.value), 0), 2, 3, '.', ',')}
            />
        </Main>
    )
}

export default Collect;