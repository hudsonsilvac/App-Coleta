import React, { useEffect, useState } from "react";

import BoxCommon from "../../atoms/boxes/boxCommon";
import Text from "../../atoms/text";

import { IndexProps } from "./models";
import { BoxIcon, Icon, Input, Main } from "./style";

const Item: React.FC<IndexProps> = ({
    description,
    prevision,
    value,
    setValue,
    disabled,
}) => {
    const [icon, setIcon] = useState<string>('');
    const [text, setText] = useState<string>(value)

    useEffect(() => {
        generateIcon()
    }, [description])

    useEffect(() => {
        setValue(text)
    }, [text])

    const generateIcon = () => {
        setIcon('')
        if (description.toUpperCase().indexOf('OSSO') >= 0)
            setIcon('🦴')
        if (description.toUpperCase().indexOf('MUXIBA') >= 0)
            setIcon('🥩')
        if (description.toUpperCase().indexOf('ABATE') >= 0)
            setIcon('🐂')
        if (description.toUpperCase().indexOf('GORDURA') >= 0)
            setIcon('🧈')
        if (description.toUpperCase().indexOf('SANGUE') >= 0)
            setIcon('🩸')
    }

    return (
        <Main>
            <BoxCommon flex={1} flexDirection='row' alignItems='center'>
                <BoxIcon>
                    <Icon>
                        { icon }
                    </Icon>
                </BoxIcon>
                <Text type='H4' text={description} weight='700' ml='15px' />
            </BoxCommon>
            <BoxCommon flex={0.5}>
                <Text type='H4' text={prevision} weight='400' ml='15px' />
            </BoxCommon>
            <BoxCommon flex={0.5}>
                <Input
                    value={text}
                    onChangeText={setText}
                    placeholder='0'
                    keyboardType='numeric'
                    editable={!!!disabled}
                    selectTextOnFocus={!!!disabled}
                />
            </BoxCommon>
        </Main>
    )
}

export default Item;