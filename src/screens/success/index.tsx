import React from "react";

import { white } from "../../atomic/constants/colors";

import Main from "../../atomic/atoms/main";
import Background from "../../atomic/atoms/background";
import Text from "../../atomic/atoms/text";

import Bg from '../../assets/background/splashSuccess.png'
import Button from "../../atomic/molecules/button";

import Check from '../../assets/vectors/correct.png'

import { Correct } from "./style";

const Success: React.FC = () => {
    return (
        <Main>
            <Background source={Bg}>
                <Correct source={Check} />
                <Text type='H1' text={`Coleta\nFinalizada!`} color={white} align='center' mt='40px' mb='40px' />
                <Button text='Voltar para home' onPress={() => null} />
            </Background>
        </Main>
    )
}

export default Success