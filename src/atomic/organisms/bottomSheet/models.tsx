import { ButtonTypes } from "../../molecules/button/models";

export interface IndexProps {
    title: string;
    description?: string;
    children?: React.ReactNode[] | React.ReactNode | undefined | string | number;
    type?: TypeModal;
    visible: boolean;
    setState: (state: boolean) => void;
    buttonConfirm?: ButtonConfirm;
    onShow?: () => void;
    onClose?: () => void;
}

type TypeModal = 'question';
type ButtonConfirm = {
    type: ButtonTypes;
    text: string;
    disabled?: boolean;
    onPress: () => void;
}