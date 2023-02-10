import React from "react";

import { primary } from "../../atomic/constants/colors";

import Container from "../../atomic/atoms/container";
import Text from "../../atomic/atoms/text";
import Input from "../../atomic/atoms/input";
import BoxValue from "../../atomic/molecules/boxValue";

import { ViewProps } from "./models";
import List from "../../atomic/atoms/list";
import BoxCommon from "../../atomic/atoms/boxes/boxCommon";

const View: React.FC<ViewProps> = ({
    user,
    search,
    setSearch,
    providersToCollect,
    providersCollected,
    providersDisabled,
    providerData,
    list,
    listItemSelected,
    setListItemSelected
}) => {
    return (
        <Container>
            <Text type='H2' color={primary} text={`Olá, ${user}!`} />
            <Text type='H3' text='Pronto para coletar?' mt='5px' mb='20px' />
            <List data={list} selected={listItemSelected} setSelected={setListItemSelected} />
            <Input placeholder='Procurar fornecedores' value={search} onChangeText={setSearch} mt='20px' />
            {
                (listItemSelected === 0 || listItemSelected === 1)
                && (
                    <>
                        <Text type='H3' text='Fornecedores a coletar' weight='700' mt='20px' mb='20px' />
                        {
                            providersToCollect.map((item) => (
                                <BoxValue
                                    text={item.text}
                                    value={{ description: item.value.description, state: item.value.state }}
                                    onPress={() => providerData(item.id)}
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
                        <Text type='H3' text='Fornecedores coletados' weight='700' mt='20px' mb='20px' />
                        {
                            providersCollected.map((item) => (
                                <BoxValue
                                    text={item.text}
                                    value={{ description: item.value.description, state: item.value.state }}
                                    onPress={() => providerData(item.id)}
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
                        <Text type='H4' text='Fornecedores indisponíveis' weight='700' mt='20px' mb='20px' />
                        {
                            providersDisabled.map((item) => (
                                <BoxValue
                                    text={item.text}
                                    value={{ description: item.value.description, state: item.value.state }}
                                    onPress={() => providerData(item.id)}
                                />
                            ))
                        }
                    </>
                )
            }
            <BoxCommon height='50px' />
        </Container>
    )
}

export default View;