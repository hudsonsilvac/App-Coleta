import React, { useEffect, useState } from "react";

import { Alert } from "react-native";
import { BluetoothManager, BluetoothEscposPrinter } from "tp-react-native-bluetooth-printer";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import { white } from "../../atomic/constants/colors";
import { currency } from "../../constants/formats";

import Main from "../../atomic/atoms/main";
import Background from "../../atomic/atoms/background";
import Text from "../../atomic/atoms/text";
import Button from "../../atomic/molecules/button";
import BoxCommon from "../../atomic/atoms/boxes/boxCommon";
import { ItemType } from "../../atomic/organisms/item/models";

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
        description: 'Residuos Abate',
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
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()
    const route = useRoute<RouteProp<StackProps, 'Collect'>>().params;

    const [showModal, setShowModal] = useState<boolean>(false)
    const [items, setItems] = useState<ItemType[]>(Items)

    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        BluetoothManager.enableBluetooth().then(
            async (r) => {
                var paired = [];
                if (r && r.length > 0) {
                    for (var i = 0; i < r.length; i++) {
                    try {
                        paired.push(JSON.parse(r[i]));
                    } catch (e) {
                        Alert.alert('Paired Printers', e)
                    }
                    }
                }

                await BluetoothManager.connect(paired[0].address)
            },
            (err) => Alert.alert('Enable Bluetooth', err)
        );
    }

    const confirm = async () => {
        await BluetoothEscposPrinter.printText('--------------------------------', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText(`${('NUTRIFORTE').padStart(21, ' ')}`, {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText(`${('(61) 3626-0000').padStart(23, ' ')}`, {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('--------------------------------', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('Código: 86822', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        let date = new Date();
        let currentDate = `${date.getDate()}/${String(date.getMonth()+1).padStart(2, '0')}/${date.getFullYear()}`
        let currentTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`

        await BluetoothEscposPrinter.printText(`Data: ${currentDate} ${currentTime}`, {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('12-TATICO / REC DAS EMAS', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('================================', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('Produto               Quantidade', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('================================', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });

        for (let i = 0; i < items.length; i++) {
            if (Number(items[i].value) > 0) {
                await BluetoothEscposPrinter.printText(`${items[i].description.padEnd(31 - items[i].value.length, ' ')} ${items[i].value}`, {
                    encoding: "Cp857",
                    codepage: 13,
                    fonttype: 1,
                    widthtimes: 3,
                    heigthtimes: 3,
                });
            }
        }

        await BluetoothEscposPrinter.printText('================================', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        let total = currency(items.reduce((valor, total) => Number(valor) + Number(total.value), 0), 2, 3, '.', ',');
        await BluetoothEscposPrinter.printText(total.padStart(32, ' '), {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 1,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

        setShowModal(false)
        navigation.navigate('Success')
    }

    return (
        <Main>
            <Background source={Bg} small justifyContent='space-between'>
                <BoxCommon width='100%' mt='60px' mb='30px'>
                    <Button type='back' onPress={() => navigation.goBack()} />
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
                showModal={showModal}
                setShowModal={setShowModal}
                confirm={confirm}
            />
        </Main>
    )
}

export default Collect;