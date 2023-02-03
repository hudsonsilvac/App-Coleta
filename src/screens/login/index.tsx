import React from "react";

import { white } from "../../atomic/constants/colors";

import Main from "../../atomic/atoms/main";
import Background from "../../atomic/atoms/background";
import Text from "../../atomic/atoms/text";

import Bg from '../../assets/background/splashHome.png'
import Button from "../../atomic/molecules/button";

const Login: React.FC = () => {
    return (
        <Main>
            <Background source={Bg} justifyContent='flex-end'>
                <Text type='H1' text={`Vamos\ncomeçar?`} color={white} align='center' />
                <Text type='H3' text='Colete da maneira certa' color={white} align='center' mt='30px' mb='30px' />
                <Button text='Começar a coletar' onPress={() => null} />
            </Background>
        </Main>
    )
}

export default Login