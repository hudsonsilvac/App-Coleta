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
import products from "../../services/api/products";
import { StoresProps, UsersProps } from "../../services/api/users/models";
import { CollectionProps } from "../../services/api/collections/models";
import { ProductsProps } from "../../services/api/products/models";
import DBProducts from '../../services/sqlite/products'
import DBCollections from '../../services/sqlite/collections'

import { IndexProps } from "./models";
import View from "./view";

const Login: React.FC<IndexProps> = ({
    userData,
    setLoginData
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [showModal, setShowModal] = useState<boolean>(false)
    
    const [showStores, setShowStores] = useState<boolean>(false)
    const [stores, setStores] = useState<StoresProps[]>([])
    const [storeSelected, setStoreSelected] = useState<StoresProps>({ CODIGO: '', FANTASIA: '' })

    const [showUsers, setShowUsers] = useState<boolean>(false)
    const [user, setUser] = useState<UsersProps[]>([])
    const [userSelected, setUserSelected] = useState<UsersProps>({ MATRICULA: '', NOME: '' })

    const [showKM, setShowKM] = useState<boolean>(false)
    const [initialKM, setInitialKM] = useState<string>('')

    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        if (userData.dateLogin === getDateCurrent()) {
            navigation.navigate('Home')
            return
        }

        users.listStores().then((data: StoresProps[]) => setStores(data))
        DBCollections.deleteAll()
        DBProducts.deleteAll()
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
        .catch(() => Alert.alert('Falha ao entrar', 'Usuário ou senha incorretos!'))
    }

    const verifyKM = () => {
        collections.verifyKM({ codMotorista: userSelected.MATRICULA })
        .then(() => setShowKM(true))
        .catch(() => Alert.alert('Indisponível', 'Sem coletas para fazer'))
    }

    const insertKM = () => {
        collections.insertKM({
            codMotorista: userSelected.MATRICULA,
            kmInicial: initialKM,
            dtHoraStatus: getTimeCurrent()
        })
        .then(() => {
            setIsLoading(true)

            collections.listSuccess({ codMotorista: userSelected.MATRICULA })
            .then((data: CollectionProps[]) => {
                if (data.length <= 0)
                    return
                
                data.map(item => {
                    DBCollections.insert({
                        CODFILIAL: item.CODFILIAL,
                        FILIAL: item.FILIAL,
                        CODFORNEC: item.CODFORNEC,
                        CODORDEMCOLETA: item.CODORDEMCOLETA,
                        DTCOLETA: item.DTCOLETA,
                        DTULTALTERACAO: item.DTULTALTERACAO,
                        FORNECEDOR: item.FORNECEDOR,
                        POSICAO: item.POSICAO,
                        BAIRRO: item.BAIRRO,
                        CIDADE_ESTADO: item.CIDADE_ESTADO,
                        ENDERECO: item.ENDERECO,
                        TELEFONE: item.TELEFONE,
                        QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                        TIPO: '1',
                        VLTOTAL: item.VLTOTAL
                    })
                })
            })

            collections.listToCollect({ codMotorista: userSelected.MATRICULA })
            .then((data: CollectionProps[]) => {
                if (data.length <= 0)
                    return

                data.map(item => {
                    DBCollections.insert({
                        CODFILIAL: item.CODFILIAL,
                        FILIAL: item.FILIAL,
                        CODFORNEC: item.CODFORNEC,
                        CODORDEMCOLETA: item.CODORDEMCOLETA,
                        DTCOLETA: item.DTCOLETA,
                        DTULTALTERACAO: item.DTULTALTERACAO,
                        FORNECEDOR: item.FORNECEDOR,
                        POSICAO: item.POSICAO,
                        BAIRRO: item.BAIRRO,
                        CIDADE_ESTADO: item.CIDADE_ESTADO,
                        ENDERECO: item.ENDERECO,
                        TELEFONE: item.TELEFONE,
                        QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                        TIPO: '2',
                        VLTOTAL: item.VLTOTAL
                    })
                })
            })
            
            collections.listToDo({ codMotorista: userSelected.MATRICULA })
            .then((data: CollectionProps[]) => {
                if (data.length <= 0)
                    return
                
                data.map(item => {
                    DBCollections.insert({
                        CODFILIAL: item.CODFILIAL,
                        FILIAL: item.FILIAL,
                        CODFORNEC: item.CODFORNEC,
                        CODORDEMCOLETA: item.CODORDEMCOLETA,
                        DTCOLETA: item.DTCOLETA,
                        DTULTALTERACAO: item.DTULTALTERACAO,
                        FORNECEDOR: item.FORNECEDOR,
                        POSICAO: item.POSICAO,
                        BAIRRO: item.BAIRRO,
                        CIDADE_ESTADO: item.CIDADE_ESTADO,
                        ENDERECO: item.ENDERECO,
                        TELEFONE: item.TELEFONE,
                        QTTOTALCOLETADA: item.QTTOTALCOLETADA,
                        TIPO: '3',
                        VLTOTAL: item.VLTOTAL
                    })
                })
            })

            products.listAll({ codMotorista: userSelected.MATRICULA, codFilial: storeSelected.CODIGO })
            .then((data: ProductsProps[]) => {
                data.map(item => {
                    DBProducts.insert({
                        CODPROD: item.CODPROD,
                        CODFORNEC: item.CODFORNEC,
                        DESCRICAO: item.DESCRICAO,
                        QTPREVISAO: item.QTPREVISAO,
                        PCOMPRA: item.PCOMPRA,
                        COLETA: item.COLETA
                    })
                })
            })

            setTimeout(() => {
                navigate()
            }, 10000);
        })
    }

    const navigate = () => {
        setIsLoading(false)
        setShowKM(false)
        setLoginData({
            id: userSelected.MATRICULA,
            name: userSelected.NOME,
            dateLogin: getDateCurrent()
        })
        navigation.navigate('Home')
    }
    

    return (
        <View
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
            isLoading={isLoading}
        />
    )
}

const mapStateToProps = ({
    loginReducer
}: {
    loginReducer: LoginTypes
}) => ({
    userData: loginReducer.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoginData: (data: LoginTypes['data']) => dispatch({ type: 'SET_LOGIN_DATA', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);