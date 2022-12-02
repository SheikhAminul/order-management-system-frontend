import * as React from 'react'
import { useState } from 'react'

export default function OrderForm({ onSubmit, defaultData }: { onSubmit: Function, defaultData: any }) {
    const [formData, setFormData] = useState(defaultData)

    function handleChange({ target: { name, value } }: any) {
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(event: Event) {
        event.preventDefault()
        if (formData.status > -1) formData.status = Number(formData.status)
        formData.amount = Number(formData.amount)
        onSubmit(formData)
    }

    return (
        <form className='' onSubmit={handleSubmit as any}>
            <div className='grid grid-cols-2 gap-5 items-end'>
                <div>
                    <label className='input-label mb-2.5'>Customer name:</label>
                    <input className='input-secondary-sm' type='text' name='name' value={formData.name} onChange={handleChange} required={true} autoFocus={true} />
                </div>
                <div>
                    <label className='input-label mb-2.5'>Customer email:</label>
                    <input className='input-secondary-sm' type='email' name='email' value={formData.email} onChange={handleChange} required={true} />
                </div>
                <div>
                    <label className='input-label mb-2.5'>Customer phone:</label>
                    <input className='input-secondary-sm' type='tel' name='phone' value={formData.phone} onChange={handleChange} required={true} />
                </div>
                <div>
                    <label className='input-label mb-2.5'>Street address:</label>
                    <input className='input-secondary-sm' type='text' name='street' value={formData.street} onChange={handleChange} required={true} />
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label className='input-label mb-2.5'>City:</label>
                        <input className='input-secondary-sm' type='text' name='city' value={formData.city} onChange={handleChange} required={true} />
                    </div>
                    <div>
                        <label className='input-label mb-2.5'>State:</label>
                        <input className='input-secondary-sm' type='text' name='state' value={formData.state} onChange={handleChange} required={true} />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label className='input-label mb-2.5'>Zip/Postal code:</label>
                        <input className='input-secondary-sm' type='text' name='zipcode' value={formData.zipcode} onChange={handleChange} required={true} />
                    </div>
                    <div>
                        <label className='input-label mb-2.5'>Country:</label>
                        <select className='input-secondary-sm' name='country' value={formData.country} onChange={handleChange} >
                            <option value='BD'>Bangladesh</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className='input-label mb-2.5'>Product name:</label>
                    <input className='input-secondary-sm' type='text' name='product' value={formData.product} onChange={handleChange} required={true} />
                </div>
                <div>
                    <label className='input-label mb-2.5'>Billing amount (BDT):</label>
                    <input className='input-secondary-sm' type='number' name='amount' value={formData.amount} onChange={handleChange} required={true} />
                </div>
                <div>
                    <label className='input-label mb-2.5'>Product details:</label>
                    <input className='input-secondary-sm' type='text' name='details' value={formData.details} onChange={handleChange} required={true} />
                </div>
                {
                    formData.status > -1 ? (
                        <div>
                            <label className='input-label mb-2.5'>Order status:</label>
                            <select className='input-secondary-sm' name='status' value={formData.status} onChange={handleChange} required={true}>
                                <option value='' disabled={true}>Choose...</option>
                                <option value='0'>Pending</option>
                                <option value='1'>Paid</option>
                                <option value='2'>Fulfilled</option>
                                <option value='3'>Refunded</option>
                            </select>
                        </div>
                    ) : ''
                }
                <button className='button-primary-md w-full' type='submit'>Save</button>
            </div>
        </form>
    )
}