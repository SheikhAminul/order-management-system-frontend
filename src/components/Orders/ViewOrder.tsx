import * as React from 'react'
import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { doFetch } from '../../scripts/others/do-fetch'
import LoadingAnimation from '../Others/LoadingAnimation'
import Modal from '../Others/Modal'

interface OrderData {
    id: number,
    product: string,
    details: string,
    amount: number,
    orderDate: string,
    status: number,
    customerId: number,
    invoiceId: string,
    paymentUrl: string,
    name: string,
    email: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string
}

const statusNames = ['Pending', 'Paid', 'Fulfilled', 'Refunded']

function OrderDetails({ order: { name, email, phone, street, city, state, zipcode, product, amount, invoiceId, status, paymentUrl } }: { order: OrderData }) {
    return (
        <div>
            <h4 className='font-semibold mb-2.5'>Customer:</h4>
            <div className='grid grid-cols-[75px_auto] gap-x-3.5 gap-y-2 mb-5'>
                <span>Name:</span><span>{name}</span>
                <span>Email:</span><span>{email}</span>
                <span>Phone:</span><span>{phone}</span>
                <span>Address:</span><span>{street}, {city}, {state} - {zipcode}</span>
            </div>
            <h4 className='font-semibold mb-2.5'>Order Info:</h4>
            <div className='grid grid-cols-[75px_auto] gap-x-3.5 gap-y-2 mb-5'>
                <span>Product:</span><span>{product}</span>
                <span>Amount:</span><span>{amount}</span>
                <span>Invoice ID:</span><span>{invoiceId}</span>
                <span>Status:</span><span>{statusNames[status]}</span>
            </div>
            <div>
                <div className='flex'>
                    <label className='input-label mb-2.5 mr-auto'>Payment link:</label>
                    <FiCopy className='w-4 h-4 text-sky-600 cursor-pointer' onClick={() => { navigator.clipboard.writeText(paymentUrl) }} />
                </div>
                <input className='input-secondary-sm' type='text' value={paymentUrl} />
            </div>
        </div>
    )
}

function ViewOrder() {
    const navigate = useNavigate()
    const { orderId } = useParams()

    const [status, setStatus] = useState(0)
    const [order, setOrder] = useState() as any

    useEffect(() => {
        doFetch('GET', `/order/${orderId}`, { cached: false }).then(order => setOrder(order))
    }, [])

    return (
        <div className='min-h-[350px]'>
            {
                status === -1 || !order ? <LoadingAnimation className='rounded-md' /> : ''
            }
            {
                order ? <OrderDetails order={order} /> : ''
            }
        </div>
    )
}

export default function ViewOrderModal() {
    const navigate = useNavigate()

    return (
        <Modal
            closeButton={true}
            className='max-w-[350px]'
            onClose={() => navigate('/dashboard/orders')}
            body={() => <ViewOrder />}
            defaultStatus={1}
        />
    )
}