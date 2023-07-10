import api from '../index'
import { IndexType, LoginProps, StoresProps, UsersProps, UsersType } from './models'

const login = ({ matricula, password }: IndexType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('auth/login.php', { matricula, password })
        .then((response) => {
            let res:LoginProps = response.data

            if (res.status == true) resolve(true)
            else reject(false)
        })
        .catch((response) => reject(response))
    })
}

const listStores = () => {
    return new Promise<StoresProps[]>(async (resolve, reject) => {
        await api.get('usuarios/get-filiais.php')
        .then((response) => {
            let res:StoresProps[] = response.data.filiais
            let array:StoresProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: StoresProps = {
                    CODIGO: res[i].CODIGO,
                    FANTASIA: res[i].FANTASIA,
                }
                array.push(json)
            }

            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

const listUsers = ({ codFilial }: UsersType) => {
    return new Promise<UsersProps[]>(async (resolve, reject) => {
        await api.post('usuarios/get-usuarios.php', { codFilial })
        .then((response) => {
            let res:UsersProps[] = response.data.usuarios
            let array:UsersProps[] = []

            for (let i = 0; i < res?.length; i++ ) {
                let json: UsersProps = {
                    MATRICULA: res[i].MATRICULA,
                    NOME: res[i].NOME,
                    NUMCAR: res[i].NUMCAR
                }
                array.push(json)
            }

            resolve(array || [])
        })
        .catch((response) => reject(response))
    })
}

export default {
    login,
    listStores,
    listUsers
}