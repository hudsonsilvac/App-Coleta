import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { LoginTypes } from "../../services/redux/reducers/login/models";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import { getDateCurrent, getTimeCurrent } from "../../constants/date";

import users from "../../services/api/users";
import collections from "../../services/api/collections";
import { StoresProps, UsersProps } from "../../services/api/users/models";
import DBProducts from '../../services/sqlite/products'
import DBCollections from '../../services/sqlite/collections'

import { IndexProps } from "./models";
import View from "./view";
import { sincronizeDB } from "../../constants/sincronize";
import { CollectionsTypes } from "../../services/redux/reducers/collections/models";
import { ItemsType } from "../../services/api/collections/models";
import { SuppliersTypes } from "../../services/redux/reducers/suppliers/models";
import { ProductsProps } from "../../services/sqlite/products/models";
import NetInfo from "@react-native-community/netinfo";

const Login: React.FC<IndexProps> = ({
    userData,
    setLoginData,
    isSincronized,
    setIsSincronized
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [showModal, setShowModal] = useState<boolean>(false)
    
    const [showStores, setShowStores] = useState<boolean>(false)
    const [stores, setStores] = useState<StoresProps[]>([])
    const [storeSelected, setStoreSelected] = useState<StoresProps>({ CODIGO: '', FANTASIA: '' })

    const [showUsers, setShowUsers] = useState<boolean>(false)
    const [user, setUser] = useState<UsersProps[]>([])
    const [userSelected, setUserSelected] = useState<UsersProps>({ MATRICULA: '', NOME: '', NUMCAR: '' })

    const [showKM, setShowKM] = useState<boolean>(false)
    const [initialKM, setInitialKM] = useState<string>('')

    const [password, setPassword] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingSincronized, setIsLoadingSincronized] = useState<boolean>(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        if (userData.dateLogin === getDateCurrent()) {
            navigation.navigate('Home')
            return
        }

        users.listStores().then((data: StoresProps[]) => setStores(data))
    }

    const start = async () => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert('Aviso', 'Seu dispositivo está sem internet, por favor, conecte-o para acessar o aplicativo')
                return
            }
        });

        if (!isSincronized) {
            setIsLoadingSincronized(true)
            await DBCollections.listSuccess()
            .then(async (data: SuppliersTypes['data'][]) => {
                data.map(item => {
                    let codOrdemColeta: string, DTULAlteracao: string, dtHoraColeta: string, data: string, dtHoraStatus: string, numCar: string
                    let qtTotalColetada: string, qtItensColetados: string, qtItensPrevistos: string, qtPrevista: string, pesoColeta: string
                    let vlTotal: string, vlColeta: string, newItems: ItemsType[]
                    
                    Promise.all([
                        DBProducts.listAll({ CODFORNEC: item.CODFORNEC })
                        .then((dataP: ProductsProps[]) => {
                            codOrdemColeta = item.CODORDEMCOLETA
                            DTULAlteracao = item.DTULTALTERACAO
                            dtHoraColeta = item.DTCOLETA
                            data = item.DTCOLETA
                            dtHoraStatus = item.DTCOLETA
                            numCar = userData.numCar

                            qtTotalColetada = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))
                            qtItensColetados = String(dataP.reduce((accumulattor, total) => Number(total) > 0 ? Number(accumulattor) + 1 : 1, 0))
                            qtItensPrevistos = String(dataP.length)
                            qtPrevista = String(dataP.reduce((valor, total) => Number(valor) + Number(total.QTPREVISAO), 0))
                            pesoColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + Number(total.COLETA), 0))

                            vlTotal = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))
                            vlColeta = String(dataP.reduce((accumulattor, total) => Number(accumulattor) + (Number(total.PCOMPRA || 0) * Number(total.COLETA || 0)), 0))

                            newItems = dataP.map(item => ({
                                codProd: String(item.CODPROD),
                                quantidade: item.COLETA,
                                pCompra: item.PCOMPRA,
                                qtPrevista: item.QTPREVISAO,
                            }))
                    
                        })
                    ]).then(() => {
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
                    }).then(() => {
                        DBCollections.deleteAll()
                        DBProducts.deleteAll()
                    })
                })
            })
        } else {
            DBCollections.deleteAll()
            DBProducts.deleteAll()
        }

        setIsSincronized(true)
        setIsLoadingSincronized(false)

        setShowModal(true)
    }

    useEffect(() => {
        loadUsers()
    }, [storeSelected])

    const loadUsers = () => {
        if (storeSelected.CODIGO == '') return

        users.listUsers({ codFilial: storeSelected.CODIGO }).then((data: UsersProps[]) => setUser(data))
    }

    const confirm = () => {
        users.login({ matricula: userSelected.MATRICULA, password })
        .then(() => {
            verifyKM()
            setShowModal(false)
        })
        .catch((res) => Alert.alert('Falha ao entrar', res ?? 'Sem conexão com API'))
    }

    const verifyKM = () => {
        collections.verifyKM({ codMotorista: userSelected.MATRICULA })
        .then(() => setShowKM(true))
        .catch(() => Alert.alert('Indisponível', 'Sem coletas para fazer'))
    }

    const insertKM = () => {
        if (!initialKM) {
            Alert.alert('Alerta', 'Insira o KM inicial')
            return
        }

        collections.insertKM({
            codMotorista: userSelected.MATRICULA,
            kmInicial: initialKM,
            dtHoraStatus: `${getDateCurrent()} ${getTimeCurrent()}`
        })
        .then(() => {
            setIsLoading(true)

            sincronizeDB(userSelected.MATRICULA, storeSelected.CODIGO)

            setTimeout(() => {
                navigate()
            }, 10000);
        })
        .catch(value => Alert.alert('Falha ao entrar', value))
    }

    const navigate = () => {
        setIsLoading(false)
        setShowKM(false)
        setLoginData({
            id: userSelected.MATRICULA,
            name: userSelected.NOME,
            dateLogin: getDateCurrent(),
            numCar: userSelected.NUMCAR,
            idStore: storeSelected.CODIGO,
            hourSync: getTimeCurrent()
        })
        navigation.navigate('Home')
    }
    

    return (
        <View
            start={start}
            showModal={showModal}
            setShowModal={setShowModal}
            showStores={showStores}
            setShowStores={setShowStores}
            stores={stores}
            storeSelected={storeSelected}
            setStoreSelected={setStoreSelected}
            showUsers={showUsers}
            setShowUsers={setShowUsers}
            user={user}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
            showKM={showKM}
            setShowKM={setShowKM}
            initialKM={initialKM}
            setInitialKM={setInitialKM}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            insertKM={insertKM}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            isLoadingSincronized={isLoadingSincronized}
        />
    )
}

const mapStateToProps = ({
    loginReducer,
    collectionsReducer,
}: {
    loginReducer: LoginTypes,
    collectionsReducer: CollectionsTypes,
}) => ({
    userData: loginReducer.data,
    isSincronized: collectionsReducer.sincronized
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoginData: (data: LoginTypes['data']) => dispatch({ type: 'SET_LOGIN_DATA', payload: { data } }),
    setIsSincronized: (data: CollectionsTypes['sincronized']) => dispatch({ type: 'SET_SINCRONIZED', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);