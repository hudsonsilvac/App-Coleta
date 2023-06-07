export type IndexType = {
    email: string;
    password: string;
}

export interface LoginProps {
    access_token: string;
    user: {
        id: number;
        email: string;
        name: string;
    }
}