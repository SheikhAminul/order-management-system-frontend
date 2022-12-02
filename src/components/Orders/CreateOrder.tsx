import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doFetch } from '../../scripts/others/do-fetch'
import LoadingAnimation from '../Others/LoadingAnimation'
import Modal from '../Others/Modal'
import OrderForm from './OrderForm'

function CreateOrder() {
    const [status, setStatus] = useState(0)
    let navigate = useNavigate()

    async function handleSubmission(formData: any) {
        setStatus(-1)
        const { success, orderId } = await doFetch('POST', '/order/create', { body: formData })
        if (success) {
            navigate(`/dashboard/orders/view/${orderId}`)
        } else setStatus(0)
    }

    return (
        <>
            {
                status === -1 ? <LoadingAnimation className='rounded-md' /> : ''
            }
            <OrderForm defaultData={{ name: '', email: '', phone: '', street: '', city: '', state: '', zipcode: '', country: 'BD', amount: '' as any, product: '', details: '' }} onSubmit={handleSubmission} />
        </>
    )
}

export default function CreateOrderModal() {
    let navigate = useNavigate()

    return (
        <Modal
            closeButton={true}
            className='max-w-[600px]'
            onClose={() => navigate('/dashboard/orders')}
            body={() => <CreateOrder />}
            defaultStatus={1}
        />
    )
}