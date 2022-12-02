import * as React from 'react'
import { useState } from 'react'

export default function SignInForm({ authenticate }: { authenticate: Function }) {
    const [formData, setFormData] = useState({ email: '', password: '' })

    function handleChange({ target: { name, value } }: any) {
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(event: Event) {
        event.preventDefault()
        authenticate(formData)
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit as any}>
            <input className='input-primary-md' placeholder='Email address' type='email' name='email' value={formData.email} onChange={handleChange} required={true} autoComplete='on' autoFocus={true} />
            <input className='input-primary-md' placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} required={true} />
            <button className='button-primary-md w-full' type='submit'>Sign in</button>
        </form>
    )
}