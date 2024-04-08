import React, { useEffect, useState } from "react";
import { Alert, PermissionsAndroid } from "react-native";
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
    encoding: "GBK",
    codepage: 0,
    fonttype: 1,
    widthtimes: 0,
    heigthtimes: 0,
}

const Collect: React.FC<IndexProps> = ({
    dataSupplier,
    setLastCollect,
    setIsSincronized
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)

    const [showModalUnrealized, setShowModalUnrealized] = useState<boolean>(false)
    const [loadingConfirmUnrealized, setLoadingConfirmUnrealized] = useState<boolean>(false)

    const [items, setItems] = useState<ItemType[]>([])
    const [isInsert, setIsInsert] = useState<boolean>(false)

    const [usePrinter, setUserPrinter] = useState<boolean>(false)

    useEffect(() => {
        connect()
        listData()
    }, [])

    const connect = async () => {
        PermissionsAndroid
        .check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT)
        .then((res: boolean) => {
            if (res) {
                BluetoothManager.enableBluetooth().then(
                    async (r: any) => {
                        var paired = [];
                        if (r && r.length > 0) {
                            for (var i = 0; i < r.length; i++) {
                                try {
                                    paired.push(JSON.parse(r[i]));
                                } catch (e: any) {
                                    Alert.alert('Paired Printers', e)
                                }
                            }
                        }
        
                        await BluetoothManager.connect(paired.find(item => item.name === 'IposPrinter').address)
                        setUserPrinter(true)
                    },
                    (err: any) => Alert.alert('Enable Bluetooth', err)
                )
                Alert.alert('Aviso!', 'Nenhuma impressora detectada!')
            } else {
                Alert.alert('Aviso!', 'Você precisa ativar a permissão de Dispositivos para um melhor funcionamento da impressora!')
            }
        })
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

            const set = new Set()

            let newData = dataProduct.filter(item => {
                const duplicatedPerson = set.has(item.id);
                set.add(item.id);
                return !duplicatedPerson;
            })

            setItems(newData)
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
        setIsSincronized(false)

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

        if (!usePrinter) {
            setLoadingConfirm(false)
            setShowModal(false)
            navigation.navigate('Success')
            return
        }

        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FILIAL.padStart(21, ' ')}`, options);
        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FORNECEDOR.padStart(21, ' ')}`, options);
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
        await BluetoothEscposPrinter.printText('================================', options);
        await BluetoothEscposPrinter.printText(`          PSA APLICATIVOS`, { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

        setLoadingConfirm(false)
        setShowModal(false)
        navigation.navigate('Success')
    }

    const confirmUnrealized = async () => {
        DBCollections.updateToTodo({
            CODFORNEC: dataSupplier.CODFORNEC
        }).then(() => {
            setLastCollect(dataSupplier.CODORDEMCOLETA)
            navigation.navigate('Home')
        })
    }

    const print = async () => {
        if (!usePrinter) return

        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FILIAL.padStart(21, ' ')}`, options);
        await BluetoothEscposPrinter.printText('--------------------------------', options);
        await BluetoothEscposPrinter.printText(`${dataSupplier.FORNECEDOR.padStart(21, ' ')}`, options);
        await BluetoothEscposPrinter.printText(`Codigo: ${dataSupplier.CODORDEMCOLETA}`, { ...options, fonttype: 1, });

        await BluetoothEscposPrinter.printText(`Data: ${dataSupplier.DTCOLETA}`, { ...options, fonttype: 1, });
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
        await BluetoothEscposPrinter.printText('================================', options);
        await BluetoothEscposPrinter.printText(`          PSA APLICATIVOS`, { ...options, fonttype: 1, });
        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    }

    return (
        <Main>
            <Background source={Bg} small justifyContent='space-between'>
                <BoxCommon width='100%' flexDirection='row' justifyContent='space-between' mt='60px' mb='30px'>
                    <Button type='back' onPress={() => navigation.goBack()} />
                    {
                        dataSupplier.TIPO != '1' && (
                            <Button text='Não realizado' mt='-20px' mr='20px' onPress={() => setShowModalUnrealized(true)} />
                        )
                    }
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
                confirm={confirm}
                loadingConfirm={loadingConfirm}
                showModalUnrealized={showModalUnrealized}
                setShowModalUnrealized={setShowModalUnrealized}
                confirmUnrealized={confirmUnrealized}
                loadingConfirmUnrealized={loadingConfirmUnrealized}
                type={dataSupplier.TIPO}
                print={print}
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
    setLastCollect: (lastCollect: CollectionsTypes['lastCollect']) => dispatch({ type: 'SET_COLLECT_LAST', payload: { lastCollect } }),
    setIsSincronized: (sincronized: CollectionsTypes['sincronized']) => dispatch({ type: 'SET_SINCRONIZED', payload: { sincronized } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Collect);