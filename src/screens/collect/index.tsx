import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BluetoothManager, BluetoothEscposPrinter } from "tp-react-native-bluetooth-printer";

import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";

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
import { IndexProps } from "./models";
import reactotron from "reactotron-react-native";
import products from "../../services/api/products";
import { ProductsProps } from "../../services/api/products/models";
import { getDateCurrent } from "../../constants/date";
import collections from "../../services/api/collections";

const Collect: React.FC<IndexProps> = ({
    dataSupplier
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()
    const route = useRoute<RouteProp<StackProps, 'Collect'>>().params;

    const [showModal, setShowModal] = useState<boolean>(false)
    const [items, setItems] = useState<ItemType[]>([])

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
        products.listAll({ codigoFilial: dataSupplier.CODFILIAL, codigoFornecedor: dataSupplier.CODFORNEC })
        .then((data: ProductsProps[]) => {
            let dataProduct: ItemType[] = data.map(item => ({
                id: item.CODPROD,
                description: item.DESCRICAO,
                prevision: item.QTPREVISAO || '0',
                value: '',
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
    }

    const confirm = async () => {
        let codOrdemColeta = dataSupplier.CODORDEMCOLETA
        let DTULAlteracao = dataSupplier.DTULTALTERACAO
        let dtHoraColeta = getDateCurrent()
        let data = getDateCurrent()
        let dtHoraStatus = getDateCurrent()
        let numCar = '0'

        let qtTotalColetada = String(items.reduce((accumulattor, total) => Number(accumulattor) + Number(total.value), 0))
        let qtItensColetados = String(items.reduce((accumulattor, total) => Number(total.value) > 0 ? Number(accumulattor) + 1 : Number(accumulattor), 0))
        let qtItensPrevistos = String(items.length)
        let qtPrevista = String(items.reduce((valor, total) => Number(valor) + Number(total.prevision), 0))
        let pesoColeta = String(items.reduce((accumulattor, total) => Number(accumulattor) + Number(total.value), 0))

        let vlTotal = String(items.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.price || 0) * Number(total.value || 0)), 0))
        let vlColeta = String(items.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.price || 0) * Number(total.value || 0)), 0))

        reactotron.warn!!({
            codOrdemColeta,
            DTULAlteracao,
            qtTotalColetada,
            qtItensColetados,
            qtItensPrevistos,
            vlTotal,
            qtPrevista,
            dtHoraColeta,
            data,
            dtHoraStatus,
            pesoColeta,
            vlColeta,
            numCar
        })

        let newItems = items.map(item => ({
            codProd: String(item.id),
            quantidade: item.value,
            pCompra: item.price,
            qtPrevista: item.prevision,
        }))

        collections.addItem({
            itens: newItems,
            codOrdemColeta,
            DTULAlteracao,
            qtTotalColetada,
            qtItensColetados,
            qtItensPrevistos,
            vlTotal,
            qtPrevista,
            dtHoraColeta,
            data,
            dtHoraStatus,
            pesoColeta,
            vlColeta,
            numCar
        })

        await BluetoothEscposPrinter.printText('--------------------------------', {
            encoding: "Cp857",
            codepage: 13,
            fonttype: 0,
            widthtimes: 3,
            heigthtimes: 3,
        });
        await BluetoothEscposPrinter.printText(`${dataSupplier.FORNECEDOR.padStart(21, ' ')}`, {
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

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Collect);