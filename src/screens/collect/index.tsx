import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BluetoothManager, BluetoothEscposPrinter, PrintTextOptions } from "tp-react-native-bluetooth-printer";

import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

import { useNavigation } from "@react-navigation/native";
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

import DBProducts from "../../services/sqlite/products";
import DBCollections from "../../services/sqlite/collections";
import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import { ProductsProps } from "../../services/api/products/models";

import View from "./view";
import { IndexProps } from "./models";
import { getDateCurrent, getTimeCurrent } from "../../constants/date";

const options: PrintTextOptions = {
    encoding: "Cp857",
    codepage: 13,
    fonttype: 0,
    widthtimes: 3,
    heigthtimes: 3,
}

const Collect: React.FC<IndexProps> = ({
    dataSupplier,
    setLastCollect
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [items, setItems] = useState<ItemType[]>([])
    const [isInsert, setIsInsert] = useState<boolean>(false)

    useEffect(() => {
        connect()
        listData()
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

    const listData = () => {
        DBProducts.listAll({ CODFORNEC: dataSupplier.CODFORNEC })
        .then((data: ProductsProps[]) => {
            let dataProduct: ItemType[] = data.map(item => ({
                id: item.CODPROD,
                description: item.DESCRICAO,
                prevision: item.QTPREVISAO || '0',
                value: item.COLETA || '',
                price: item.PCOMPRA || '0'
            }))

            setItems(dataProduct)
        })
    }

    const setValue = (value: string, id: string) => {
        let newData = items.map(item => (
            {
                id: item.id,
                description: item.description,
                prevision: item.prevision,
                value: item.id === id ? value : item.value,
            }
        ))
        setItems(newData)
        if (Number(value) > 0)
            setIsInsert(true)
    }

    const confirm = async () => {
        if (loadingConfirm) return

        if (!isInsert) {
            Alert.alert('Aviso', 'Insira algum item primeiro!')
            return
        }

        setLoadingConfirm(true)
        setLastCollect(dataSupplier.CODORDEMCOLETA)

        DBCollections.update({
            TIPO: '1',
            DTCOLETA: `${getDateCurrent()} ${getTimeCurrent()}`,
            DTULTALTERACAO: `${getDateCurrent()} ${getTimeCurrent()}`,
            CODFORNEC: dataSupplier.CODFORNEC
        })

        for (let i = 0; i < items.length; i++) {
            if (Number(items[i].value) > 0) {
                await DBProducts.update({
                    CODFORNEC: dataSupplier.CODFORNEC,
                    CODPROD: items[i].id,
                    COLETA: items[i].value
                })
            }
        }

        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FILIAL.padStart(21, ' ')}`, options);
        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FORNECEDOR.padStart(21, ' ')}`, options);
        // await BluetoothEscposPrinter.printText(`${(dataSupplier?.TELEFONE).padStart(23, ' ')}`, { ...options, fonttype: 1, });
        // await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`Codigo: ${dataSupplier.CODORDEMCOLETA}`, { ...options, fonttype: 1, });

        await BluetoothEscposPrinter.printText(`Data: ${getDateCurrent()} ${getTimeCurrent()}`, { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText(`${dataSupplier.BAIRRO} - ${dataSupplier.CIDADE_ESTADO}`, { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText('================================', options);
        await BluetoothEscposPrinter.printText('Produto               Quantidade', { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText('================================', options);

        for (let i = 0; i < items.length; i++) {
            if (Number(items[i].value) > 0) {
                await BluetoothEscposPrinter.printText(`${items[i].description.padEnd(31 - items[i].value.length, ' ')} ${items[i].value}`, { ...options, fonttype: 1, });
            }
        }

        await BluetoothEscposPrinter.printText('================================', options);
        let total = currency(items.reduce((valor, total) => Number(valor) + Number(total.value), 0), 2, 3, '.', ',');
        await BluetoothEscposPrinter.printText(total.padStart(32, ' '), { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

        setLoadingConfirm(false)
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
                        text={dataSupplier.FORNECEDOR}
                        align='center'
                        color={white}
                        numberOfLines={2}
                        adjustsFontSizeToFit
                        ml='10px'
                        mr='10px'
                    />
                    <Text
                        type='H4'
                        text={`${dataSupplier.BAIRRO || ''} ${dataSupplier.CIDADE_ESTADO}`}
                        align='center'
                        color={white}
                    />
                </BoxCommon>
                <BoxCommon />
            </Background>
            <View
                address={dataSupplier.ENDERECO || ''}
                phone={dataSupplier.TELEFONE || ''}
                items={items}
                setItem={setValue}
                total={currency(items.reduce((valor, total) => Number(valor) + Number(total.value), 0), 2, 3, '.', ',')}
                showModal={showModal}
                setShowModal={setShowModal}
                type={dataSupplier.TIPO}
                confirm={confirm}
                loadingConfirm={loadingConfirm}
            />
        </Main>
    )
}

const mapStateToProps = ({
    suppliersReducer
}: {
    suppliersReducer: SuppliersTypes
}) => ({
    dataSupplier: suppliersReducer.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLastCollect: (lastCollect: CollectionsTypes['lastCollect']) => dispatch({ type: 'SET_COLLECT_LAST', payload: { lastCollect } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Collect);