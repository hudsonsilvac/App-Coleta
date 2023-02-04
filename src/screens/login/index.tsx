import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../routes/models";

import View from "./view";

const Login: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const confirm = () => {
        setShowModal(false)
        navigation.navigate('Home')
    }

    return (
        <View
            showModal={showModal}
            setShowModal={setShowModal}
            login={login}
            setLogin={setLogin}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
        />
    )
}

export default Login