export interface ViewProps {
    showModal: boolean;
    setShowModal: (state: boolean) => void;
    login: string;
    setLogin: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirm: () => void;
}