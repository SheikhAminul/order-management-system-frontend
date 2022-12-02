import * as React from 'react'
import OAuth from '../../scripts/others/oauth'

export default function Account() {
    const { email, firstName, lastName } = OAuth.actingUser
    return (
        <>
            <div className='mb-2.5 font-medium'>Account information:</div>
            <div className='grid grid-cols-[75px_auto] text-gray-400 items-center'>
                <span>First name:</span>
                <span>{firstName}</span>
                <span>Last name:</span>
                <span>{lastName}</span>
                <span>Email:</span>
                <span>{email}</span>
            </div>
        </>
    )
}