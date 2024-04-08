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
    start,
    showModal,
    setShowModal,
    showStores,
    setShowStores,
    stores,
    storeSelected,
    setStoreSelected,
    showUsers,
    setShowUsers,
    showKM,
    setShowKM,
    initialKM,
    setInitialKM,
    user,
    userSelected,
    setUserSelected,
    password,
    setPassword,
    confirm,
    insertKM,
    showPassword,
    setShowPassword,
    isLoading,
    isLoadingSincronized
}) => (
    <Main>
        <Background source={Bg} justifyContent='flex-end'>
            <Text type='H1' text={`Vamos\ncomeçar?`} color={white} align='center' />
            <Text type='H3' text='Colete da maneira certa' color={white} align='center' mt='30px' mb='30px' />
            <Button text='Começar a coletar' isLoading={isLoadingSincronized} onPress={start} />
            <Text type='H5' text='Versão 2.0.3' color={white} align='center' mt='30px' mb='30px' />
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
                    keyboardType={showPassword ? 'default' : 'password'}
                    setStatePassword={() => setShowPassword(!showPassword)}
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
                    user.map((item, index) => (
                            <Button
                                text={`${item.MATRICULA} - ${item.NOME}`}
                                onPress={() => {
                                    setUserSelected(item)
                                    setShowUsers(false)
                                    setShowModal(true)
                                }}
                                key={item.MATRICULA}
                                mb={user.length - 1 == index ? '70px' : '10px'}
                            />
                        )
                    )
                }
            </BottomSheet>
            <BottomSheet
                title='Inserir KM Inicial'
                visible={showKM}
                setState={() => setShowKM(false)}
                buttonConfirm={{
                    text: 'Salvar',
                    type: 'primary',
                    onPress: insertKM,
                    isLoading
                }}
            >
                <Input
                    value={initialKM}
                    onChangeText={setInitialKM}
                    placeholder='Digite o KM'
                    keyboardType="number-pad"
                    mb='30px'
                />
            </BottomSheet>
        </Background>
    </Main>
)

export default View