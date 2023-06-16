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
    showStores,
    setShowStores,
    stores,
    storeSelected,
    setStoreSelected,
    showUsers,
    setShowUsers,
    user,
    userSelected,
    setUserSelected,
    login,
    setLogin,
    password,
    setPassword,
    confirm
}) => (
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
                    value=''
                    onChangeText={() => null}
                    placeholder={storeSelected.FANTASIA || 'Selecione a Filial' }
                    onPress={() => {
                        setShowModal(false)
                        setShowStores(true)
                    }}
                    mb='15px'
                />
                <Input
                    value=''
                    onChangeText={() => null}
                    placeholder={userSelected.MATRICULA || 'Selecione a Matrícula' }
                    onPress={() => {
                        setShowModal(false)
                        setShowUsers(true)
                    }}
                    mb='15px'
                />
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Senha'
                    mb='30px'
                />
            </BottomSheet>
            <BottomSheet
                title='Selecione a Filial'
                visible={showStores}
                setState={() => setShowStores(false)}
            >
                {
                    stores.map(item => (
                            <Button
                                text={`${item.CODIGO} - ${item.FANTASIA}`}
                                onPress={() => {
                                    setStoreSelected(item)
                                    setShowStores(false)
                                    setShowModal(true)
                                }}
                                key={item.CODIGO}
                                mb='10px'
                            />
                        )
                    )
                }
            </BottomSheet>
            <BottomSheet
                title='Selecione a Matrícula'
                visible={showUsers}
                setState={() => setShowUsers(false)}
            >
                {
                    user.map(item => (
                            <Button
                                text={`${item.MATRICULA} - ${item.NOME}`}
                                onPress={() => {
                                    setUserSelected(item)
                                    setShowUsers(false)
                                    setShowModal(true)
                                }}
                                key={item.MATRICULA}
                                mb='10px'
                            />
                        )
                    )
                }
            </BottomSheet>
        </Background>
    </Main>
)

export default View