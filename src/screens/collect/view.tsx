import React from "react";

import { gray } from "../../atomic/constants/colors";
import { screenWidth } from "../../atomic/constants/dimension";

import BoxCommon from "../../atomic/atoms/boxes/boxCommon";
import Container from "../../atomic/atoms/container";
import Text from "../../atomic/atoms/text";
import Item from "../../atomic/organisms/item";
import Button from "../../atomic/molecules/button";
import BottomSheet from "../../atomic/organisms/bottomSheet";

import { ViewProps } from "./models";

const View: React.FC<ViewProps> = ({
    address,
    phone,
    items,
    setItem,
    total,
    showModal,
    setShowModal,
    confirm
}) => {
    return (
        <Container>
            <BoxCommon
                bgColor='white'
                width={`${screenWidth - 40}px`}
                height='100px'
                flexDirection='row'
                justifyContent='space-between'
                shadow
                ml='20px'
                mr='20px'
                mt='-35px'
                mb='20px'
                pt='10px'
                pl='10px'
                pr='10px'
                pb='10px'
            >
                <BoxCommon flex={1} mr='5px'>
                    <Text
                        type='H4'
                        text='Endereço'
                        weight='700'
                    />
                    <Text
                        type='H5'
                        text={address.substring(0, 40)}
                    />
                </BoxCommon>
                <BoxCommon flex={1} ml='5px'>
                    <Text
                        type='H4'
                        text='Telefone'
                        weight='700'
                    />
                    <Text
                        type='H5'
                        text={phone}
                    />
                </BoxCommon>
            </BoxCommon>
            <BoxCommon
                width='100%'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
                pl='20px'
                pr='20px'
                mb='20px'
            >
                <Text
                    type='H3'
                    text='Item'
                />
                <Text
                    type='H5'
                    weight='500'
                    text='Toque para alterar'
                    color={gray}
                />
            </BoxCommon>
            <BoxCommon width='100%' pl='20px' pr='20px'>
                {
                    items.map((item, index) => (
                        <Item
                            description={item.description.split(' ')[0]}
                            prevision={item.prevision}
                            value={item.value}
                            setValue={(value) => setItem(value, String(item.id))}
                            key={index}
                        />
                    ))
                }
            </BoxCommon>
            <BoxCommon width='100%' alignItems='flex-end' pr='20px' mt='20px'>
                <Text
                    type='H3'
                    text={`Total: ${total}`}
                />
            </BoxCommon>
            <BoxCommon width='100%' alignItems='center' mt='50px' mb='50px'>
                <Button type='success' text='Finalizar' larger onPress={() => setShowModal(true)} />
            </BoxCommon>
            <BottomSheet
                    title='Confirmação'
                    description='Tem certeza que você deseja finalizar esta coleta?'
                    type='question'
                    visible={showModal}
                    buttonConfirm={{
                        text: 'Finalizar',
                        type: 'success',
                        onPress: confirm
                    }}
                    setState={() => setShowModal(false)}
            />
        </Container>
    )
}

export default View;