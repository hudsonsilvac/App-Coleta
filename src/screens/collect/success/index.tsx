import React from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackProps } from "../../../routes/models";

import { white } from "../../../atomic/constants/colors";

import Main from "../../../atomic/atoms/main";
import Background from "../../../atomic/atoms/background";
import Text from "../../../atomic/atoms/text";
import Button from "../../../atomic/molecules/button";

import Bg from '../../../assets/background/splashSuccess.png'
import Check from '../../../assets/vectors/correct.png'

import { Correct } from "./style";

const Success: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()

    return (
        <Main>
            <Background source={Bg}>
                <Correct source={Check} />
                <Text type='H1' text={`Coleta\nFinalizada!`} color={white} align='center' mt='40px' mb='40px' />
                <Button text='Voltar para home' onPress={() => navigation.navigate('Home')} />
            </Background>
        </Main>
    )
}

export default Success