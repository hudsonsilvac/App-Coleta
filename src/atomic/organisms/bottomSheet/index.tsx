import React from "react";

import Text from "../../atoms/text";
import Button from "../../molecules/button";

import { IndexProps } from "./models";
import { Backdrop, Header, Main, Body, BoxModal, Footer } from "./style";

const BottomSheet: React.FC<IndexProps> = ({
    title,
    description,
    type,
    children,
    visible,
    setState,
    buttonConfirm,
    onShow,
    onClose,
}) => {
    if (!visible) return <></>

    return (
        <BoxModal
            onRequestClose={onClose}
            onShow={onShow}
            transparent
        >
            <Backdrop onPress={() => setState(false)} />
            <Main>
                <Header>
                    <Text type='H3' text={title} weight='700' />
                </Header>
                <Body>
                    { !type && children }
                    {
                        type === 'question' && <Text type='H4' text={String(description)} align='center' mb='35px' />
                    }
                </Body>
                {
                    buttonConfirm && (
                        <Footer>
                            <Button type={buttonConfirm?.type} text={buttonConfirm?.text} onPress={buttonConfirm?.onPress} larger />
                        </Footer>
                    )
                }
            </Main>
        </BoxModal>
    )
}

export default BottomSheet;