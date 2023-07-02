import { StoresProps, UsersProps } from "../../services/api/users/models";
import { LoginTypes } from "../../services/redux/reducers/login/models";

export interface IndexProps {
    userData: LoginTypes['data']
    setLoginData: (data: LoginTypes['data']) => void;
}

export interface ViewProps {
    showModal: boolean;
    setShowModal: (state: boolean) => void;

    showStores: boolean;
    setShowStores: (state: boolean) => void;
    stores: StoresProps[]
    storeSelected: StoresProps
    setStoreSelected: ({ CODIGO, FANTASIA }: StoresProps) => void;

    showUsers: boolean;
    setShowUsers: (state: boolean) => void;
    user: UsersProps[]
    userSelected: UsersProps
    setUserSelected: ({ MATRICULA, NOME }: UsersProps) => void;

    showKM: boolean;
    setShowKM: (state: boolean) => void;
    initialKM: string;
    setInitialKM: (value: string) => void;
    
    password: string;
    setPassword: (value: string) => void;
    confirm: () => void;
    insertKM: () => void;

    isLoading: boolean;
}