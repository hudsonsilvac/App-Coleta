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
    const [userSelected, setUserSelected] = useState<UsersProps>({ MATRICULA: '', NOME: '', NUMCAR: '' })

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