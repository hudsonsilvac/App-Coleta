export type IndexType = {
    matricula: string;
    password: string;
}

export type UsersType = {
    codFilial: string;
}

export interface LoginProps {
    status: boolean;
}

export interface StoresProps {
    CODIGO: string;
    FANTASIA: string;
}

export interface UsersProps {
    MATRICULA: string;
    NOME: string;
}