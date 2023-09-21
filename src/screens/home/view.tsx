import React from "react";

import { primary } from "../../atomic/constants/colors";

import Container from "../../atomic/atoms/container";
import Text from "../../atomic/atoms/text";
import Input from "../../atomic/atoms/input";
import BoxValue from "../../atomic/molecules/boxValue";

import { ViewProps } from "./models";
import List from "../../atomic/atoms/list";
import BoxCommon from "../../atomic/atoms/boxes/boxCommon";
import { boxID } from "../../constants/formats";
import Button from "../../atomic/molecules/button";

const View: React.FC<ViewProps> = ({
    showSincronize,
    isReceive,
    toReceive,
    sincronize,
    isSincronize,
    user,
    search,
    setSearch,
    providersToCollect,
    providersToDo,
    providersSuccess,
    providerData,
    list,
    listItemSelected,
    setListItemSelected
}) => (
    <Container>
        <Text type='H2' color={primary} text={`Olá, ${user}!`} />
        <Text type='H3' text='Pronto para coletar?' mt='5px' mb='20px' />
        <BoxCommon alignItems='center' width='100%'>
            {
                showSincronize && (
                        <Button
                            text='Enviar dados'
                            onPress={sincronize}
                            isLoading={isSincronize}
                            larger
                            mb='20px'
                        />
                    )
            }
        </BoxCommon>
        <List data={list} selected={listItemSelected} setSelected={setListItemSelected} />
        {
            (listItemSelected === 0 || listItemSelected === 1)
            && (
                <>
                    <Text type='H3' text='Realizadas' weight='700' mt='20px' />
                    {
                        providersSuccess.map((item, index) => (
                            <BoxValue
                                text={item.FORNECEDOR}
                                value={{ description: boxID(item.FORNECEDOR), state: 'success' }}
                                onPress={() => providerData(item)}
                                key={index}
                            />
                        ))
                    }
                </>
            )
        }
        {
            (listItemSelected === 0 || listItemSelected === 2)
            && (
                <>
                    <Text type='H3' text='Não iniciadas' weight='700' mt='20px' />
                    {
                        providersToCollect.map((item, index) => (
                            <BoxValue
                                text={item.FORNECEDOR}
                                value={{ description: boxID(item.FORNECEDOR), state: 'normal' }}
                                onPress={() => providerData(item)}
                                key={index}
                            />
                        ))
                    }
                </>
            )
        }
        {
            (listItemSelected === 0 || listItemSelected === 3)
            && (
                <>
                    <Text type='H3' text='Não realizadas' weight='700' mt='20px' />
                    {
                        providersToDo.map((item, index) => (
                            <BoxValue
                                text={item.FORNECEDOR}
                                value={{ description: boxID(item.FORNECEDOR), state: 'primary' }}
                                onPress={() => providerData(item)}
                                key={index}
                            />
                        ))
                    }
                </>
            )
        }
        {
            showSincronize && (
                <BoxCommon alignItems='center' width='100%'>
                    <Button
                        text='Receber dados'
                        type='success'
                        onPress={toReceive}
                        isLoading={isReceive}
                        larger
                        mt='15px'
                    />
                </BoxCommon>
            )
        }
        <BoxCommon height='50px' />
    </Container>
)

export default View;