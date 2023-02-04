import React from "react";

import { primary } from "../../atomic/constants/colors";

import Container from "../../atomic/atoms/container";
import Text from "../../atomic/atoms/text";
import Input from "../../atomic/atoms/input";
import BoxValue from "../../atomic/molecules/boxValue";

import { ViewProps } from "./models";

const View: React.FC<ViewProps> = ({
    user,
    search,
    setSearch,
    customersToCollect,
    customersCollected,
    customerData
}) => {
    return (
        <Container>
            <Text type='H2' color={primary} text={`Olá, ${user}!`} />
            <Text type='H3' text='Pronto para coletar?' mt='5px' mb='20px' />
            <Input placeholder='Procurar clientes' value={search} onChangeText={setSearch} />
            <Text type='H3' text='Clientes a coletar' weight='700' mt='20px' mb='20px' />
            {
                customersToCollect.map((item) => (
                    <BoxValue
                        text={item.text}
                        value={{ description: item.value.description, state: item.value.state }}
                        onPress={() => customerData(item.id)}
                    />
                ))
            }
            <Text type='H3' text='Clientes coletados' weight='700' mt='20px' mb='20px' />
            {
                customersCollected.map((item) => (
                    <BoxValue
                        text={item.text}
                        value={{ description: item.value.description, state: item.value.state }}
                        onPress={() => customerData(item.id)}
                    />
                ))
            }
        </Container>
    )
}

export default View;