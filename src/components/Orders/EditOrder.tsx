import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doFetch } from '../../scripts/others/do-fetch'
import LoadingAnimation from '../Others/LoadingAnimation'
import Modal from '../Others/Modal'
import OrderForm from './OrderForm'

function EditOrder() {
    const navigate = useNavigate()
    const { orderId } = useParams()

    const [status, setStatus] = useState(0)
    const [order, setOrder] = useState() as any

    useEffect(() => {
        doFetch('GET', `/order/${orderId}`, { cached: false }).then(order => setOrder(order))
    }, [])

    async function handleSubmission(formData: { fullName: string, email: string, password: string, type: number }) {
        setStatus(-1)
        const { success } = await doFetch('POST', `/order/${orderId}`, { body: formData })
        if (success) {
            navigate('/dashboard/orders')
        } else setStatus(0)
    }

    return (
        <div className='min-h-[350px]'>
            {
                status === -1 || !order ? <LoadingAnimation className='rounded-md' /> : ''
            }
            {
                order ? <OrderForm defaultData={order} onSubmit={handleSubmission} /> : ''
            }
        </div>
    )
}

export default function EditOrderModal() {
    const navigate = useNavigate()

    return (
        <Modal
            closeButton={true}
            className='max-w-[600px]'
            onClose={() => navigate('/dashboard/orders')}
            body={() => <EditOrder />}
            defaultStatus={1}
        />
    )
}