import api from '@api/index'
import { IndexType, LoginProps } from './models'

const loginAdmin = ({ email, password }: IndexType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('auth/login-admin.php', { email, password })
        .then((response) => {
            let res:LoginProps = response.data
            let json: LoginProps = {
                access_token: res.access_token,
                user: {
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                }
            }
            resolve(json)
        })
        .catch((response) => reject(response))
    })
}

const loginCustomer = ({ email, password }: IndexType) => {
    return new Promise(async (resolve, reject) => {
        await api.post('auth/login.php', { email, password })
        .then((response) => {
            let res:LoginProps = response.data
            let json: LoginProps = {
                access_token: res.access_token,
                user: {
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                }
            }
            resolve(json)
        })
        .catch((response) => reject(response))
    })
}

export default {
    loginAdmin,
    loginCustomer
}