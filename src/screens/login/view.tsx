import React from "react";

import { white } from "../../atomic/constants/colors";

import Main from "../../atomic/atoms/main";
import Background from "../../atomic/atoms/background";
import Text from "../../atomic/atoms/text";
import Button from "../../atomic/molecules/button";
import BottomSheet from "../../atomic/organisms/bottomSheet";

import Bg from '../../assets/background/splashHome.png'
import Input from "../../atomic/atoms/input";
import { ViewProps } from "./models";

const View: React.FC<ViewProps> = ({
    showModal,
    setShowModal,
    login,
    setLogin,
    password,
    setPassword,
    confirm
}) => {
    return (
        <Main>
            <Background source={Bg} justifyContent='flex-end'>
                <Text type='H1' text={`Vamos\ncomeçar?`} color={white} align='center' />
                <Text type='H3' text='Colete da maneira certa' color={white} align='center' mt='30px' mb='30px' />
                <Button text='Começar a coletar' onPress={() => setShowModal(true)} />
                <BottomSheet
                    title='Entrar'
                    visible={showModal}
                    buttonConfirm={{
                        text: 'Entrar',
                        type: 'primary',
                        onPress: confirm
                    }}
                    setState={() => setShowModal(false)}
                >
                    <Input
                        value={login}
                        onChangeText={setLogin}
                        placeholder='Login'
                        mb='15px'
                    />
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Senha'
                        mb='30px'
                    />
                </BottomSheet>
            </Background>
        </Main>
    )
}

export default View