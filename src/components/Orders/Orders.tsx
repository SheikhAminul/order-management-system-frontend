import * as React from 'react'
import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineEye } from 'react-icons/ai'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { doFetch } from '../../scripts/others/do-fetch'
import LoadingAnimation from '../Others/LoadingAnimation'

interface OrderInfo {
	id: number,
	product: string,
	amount: number,
	orderDate: string,
	status: number
}

const statusNames = ['Pending', 'Paid', 'Fulfilled', 'Refunded']

function Order({ orderInfo: { id, product, amount, orderDate, status } }: { orderInfo: OrderInfo }) {
	return (
		<div className='px-2.5 py-2 grid items-top gap-2.5 grid-cols-[1fr_100px_175px_75px_20px_15px] border-b border-b-gray-300 last:border-b-0'>
			<NavLink to={`/dashboard/orders/view/${id}`}>
				<div>{product}</div>
			</NavLink>
			<div>৳{amount}</div>
			<div>{new Date(orderDate).toLocaleString()}</div>
			<div>{statusNames[status]}</div>
			<NavLink to={`/dashboard/orders/view/${id}`}>
				<AiOutlineEye title='View' className='w-5 h-5 text-blue-500 cursor-pointer' />
			</NavLink>
			<NavLink to={`/dashboard/orders/edit/${id}`}>
				<FiEdit title='Edit' className='w-4 h-4 text-blue-500 cursor-pointer mt-0.5' />
			</NavLink>
		</div>
	)
}

export default function Orders() {
	const { pathname } = useLocation()
	const [orders, setOrders] = useState() as any
	const totalOrders = orders?.length || 0

	useEffect(() => {
		if (!orders || pathname === '/dashboard/orders') doFetch('GET', '/orders').then(orders => setOrders(orders))
	}, [pathname])

	return orders ? (
		<>
			<div className='mb-2.5 font-medium'>Orders ({totalOrders}):</div>
			<div className='flex flex-col rounded-md border border-gray-300'>
				{
					totalOrders === 0 ? (
						<div className='mx-5 my-20 text-center'>You have not created any orders yet.<br />Please create an order.</div>
					) : (
						<>
							<div className='px-2.5 py-1.5 font-medium grid grid-cols-[1fr_100px_175px_75px_20px_15px] items-start gap-2.5 bg-gray-200 rounded-t-md'>
								<div>Product name</div>
								<div>Amount (BDT)</div>
								<div>Order date</div>
								<div>Status</div>
							</div>
							<div className=''>
								{
									orders.map((orderInfo: OrderInfo) => <Order
										key={orderInfo.id}
										orderInfo={orderInfo}
									/>)
								}
							</div>
						</>
					)
				}
			</div>
			<Outlet />
		</>
	) : <LoadingAnimation className='' />
}