import OAuth from './oauth'

class DoFetch {
    static origin: string
    static onFetched: Function
    static fetch(method: string, pathname: string, { body, origin }: { body?: Object, origin?: string } = {}) {
        return new Promise(async (onSuccess, onFail) => {
            await fetch(`${origin || this.origin || ''}${pathname}`, {
                method: method,
                headers: {
                    ...OAuth.authorizationHeaders,
                    ...(body ? { 'Content-Type': 'application/json' } : {})
                },
                ...(body ? { body: JSON.stringify(body) } : {})
            } as any).then(async response => {
                this?.onFetched(response)
                const json = await response?.json() as any
                onSuccess(json)
            }).catch(() => onFail())
        }) as any
    }
    static configure(configurations: { origin?: string, onFetched?: Function }) {
        Object.assign(this, configurations)
    }
}

DoFetch.configure({
    origin: 'http://order-management-system-backend.vercel.app',
    onFetched: async function ({ status }: Response) {
        if (status === 401 && OAuth.isAuthorized) {
            OAuth.deleteSessionData()
            location.href = '/index.html'
        }
    }
})

async function doFetch(method: string, pathname: string, options: { body?: Object, origin?: string, cached?: boolean } = {}) {
    return await DoFetch.fetch(method, pathname, options)
}

export { doFetch }