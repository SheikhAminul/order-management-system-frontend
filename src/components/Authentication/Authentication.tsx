import * as React from 'react'
import { useEffect, useState } from 'react'
import LoadingAnimation from '../Others/LoadingAnimation'
import OAuth from '../../scripts/oauth'
import { useLocation, useNavigate } from 'react-router-dom'
import SignInForm from './SignInForm'

export default function Authentication({ className }: { className?: string }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [status, setStatus] = useState(-1) // -1 → loading, 0 → sign in, 2 → invalid credentials

    async function authenticate(credentials: any) {
        setStatus(-1)
        const { authorized } = await OAuth.authenticate(credentials)
        if (authorized) navigate('/dashboard/orders')
        else setStatus(2)
    }

    useEffect(() => {
        if (pathname === '/authentication/delete-session') OAuth.deleteSession().then(() => {
            setStatus(0)
            navigate('/authentication')
        })
        else OAuth.getAuthenticationStatus().then(({ authorized }) => authorized ? navigate('/home') : setStatus(0))
    }, [])

    return (
        <div className='min-h-full flex items-center justify-center'>
            {
                status === -1 ? <LoadingAnimation className='' /> : ''
            }
            <div className='text-center m-[50px] w-[250px]'>
                <div>
                    <img className='mb-7 px-1 w-[150px] mx-auto' src={require('../../assets/images/logo-lg.png').default} />
                </div>
                <div className='text-base '>Welcome!<br />Please sign in to your account.</div>
                <div className='my-10'>
                    {
                        status === 2 ? <div className='text-red-500 mb-5'>Invalid email address or password! Please try again with the correct credentials.</div> : ''
                    }
                    <SignInForm authenticate={authenticate} />
                </div>
            </div>
        </div>
    )
}