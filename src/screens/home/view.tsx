import React from "react";

import { primary } from "../../atomic/constants/colors";

import Container from "../../atomic/atoms/container";
import Text from "../../atomic/atoms/text";
import Input from "../../atomic/atoms/input";

import { ViewProps } from "./models";
import BoxValue from "../../atomic/molecules/boxValue";

const View: React.FC<ViewProps> = ({
    user,
    search,
    setSearch
}) => {
    return (
        <Container>
            <Text type='H2' color={primary} text={`Olá, ${user}!`} />
            <Text type='H3' text='Pronto para coletar?' mt='5px' mb='20px' />
            <Input placeholder='Procurar clientes' value={search} onChangeText={setSearch} />
            <Text type='H3' text='Clientes a coletar' weight='700' mt='20px' mb='20px' />
            <BoxValue
                value={{ description: '02', state: 'normal' }}
                text='Casa de Carne 02 Irmãos'
            />
            <Text type='H3' text='Clientes coletados' weight='700' mt='20px' mb='20px' />
        </Container>
    )
}

export default View;