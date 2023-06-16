import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { LoginTypes } from "../../services/redux/reducers/login/models";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import users from "../../services/api/users";
import { StoresProps, UsersProps } from "../../services/api/users/models";

import { IndexProps } from "./models";
import View from "./view";
import { Alert } from "react-native";

const Login: React.FC<IndexProps> = ({
    data,
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

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        users.listStores().then((data: StoresProps[]) => setStores(data))
    }

    useEffect(() => {
        loadUsers()
    }, [storeSelected])

    const loadUsers = () => {
        users.listUsers({ codFilial: storeSelected.CODIGO }).then((data: UsersProps[]) => setUser(data))
    }

    const confirm = () => {
        users.login({ matricula: userSelected.MATRICULA, password })
        .then((data) => {
            setLoginData({
                id: userSelected.MATRICULA,
                name: userSelected.NOME
            })
            setShowModal(false)
            navigation.navigate('Home')
        })
        .catch(() => Alert.alert('Falha ao entrar', 'Usuário ou senha incorretos'))
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
            login={login}
            setLogin={setLogin}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
        />
    )
}

const mapStateToProps = ({
    loginReducer
}: {
    loginReducer: LoginTypes
}) => ({
    data: loginReducer.data,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoginData: (data: LoginTypes['data']) => dispatch({ type: 'SET_LOGIN_DATA', payload: { data } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);