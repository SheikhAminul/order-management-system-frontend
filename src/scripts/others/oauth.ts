import { doFetch } from './do-fetch'
import { deleteLocal, getLocal, setLocal } from './library'

interface ActingUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    type: number
}

interface AuthenticationStatus {
    authorized: boolean,
    actingUser: ActingUser
}

export default class OAuth {
    static get isAuthorized() {
        return getLocal('authenticationStatus')?.authorized as boolean
    }
    static async deleteSession() {
        await doFetch('GET', '/signout')
        this.deleteSessionData()
    }
    static deleteSessionData() {
        deleteLocal('authenticationStatus')
    }
    static async authenticate(credentials: any) {
        const authenticationStatus = await doFetch('POST', '/authenticate', { body: credentials })
        setLocal('authenticationStatus', authenticationStatus)
        return authenticationStatus as AuthenticationStatus
    }
    static async getAuthenticationStatus() {
        const authenticationStatus = await doFetch('GET', '/status')
        setLocal('authenticationStatus', authenticationStatus)
        return authenticationStatus as AuthenticationStatus
    }
    static get actingUser() {
        return getLocal('authenticationStatus')?.actingUser as ActingUser
    }
    static get authorizationHeaders() {
        const accessToken = getLocal('authenticationStatus')?.actingUser?.accessToken
        return accessToken ? { accessToken } : {}
    }
}