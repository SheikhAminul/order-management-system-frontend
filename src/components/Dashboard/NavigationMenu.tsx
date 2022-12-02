import * as React from 'react'
import { TbLogout } from 'react-icons/tb'
import { BsBoxSeam } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { RiUserSettingsLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export default function NavigationMenu({ toggleVisibility }: { toggleVisibility: any }) {
    return (
        <div className='h-full'>
            <aside className='w-[175px] h-full flex flex-col bg-white p-5'>
                <img className='mb-7 px-1' src={require('../../assets/images/logo-lg.png').default} />
                <div className='flex flex-col gap-3.5 text-sm'>
                    <NavLink onClick={toggleVisibility} to='/dashboard/orders' className={({ isActive }) => `flex gap-2 items-center justify-start ${isActive ? 'text-blue-500' : 'cursor-pointer'}`}>
                        <BsBoxSeam className='h-4 w-4 text-blue-500' />
                        <div className='w-[120px]'>Orders</div>
                    </NavLink>
                    <NavLink onClick={toggleVisibility} to='/dashboard/orders/create' className={({ isActive }) => `flex gap-2 items-center justify-start ${isActive ? 'text-blue-500' : 'cursor-pointer'}`}>
                        <FiPlus className='h-4 w-4 text-blue-500' />
                        <div className='w-[120px]'>Create order</div>
                    </NavLink>
                    <NavLink onClick={toggleVisibility} to='/dashboard/account' className={({ isActive }) => `flex gap-2 items-center justify-start ${isActive ? 'text-blue-500' : 'cursor-pointer'}`}>
                        <RiUserSettingsLine className='h-4 w-4 text-blue-500' />
                        <div className='w-[120px]'>Account</div>
                    </NavLink>
                    <NavLink onClick={toggleVisibility} to='/authentication/delete-session' className={({ isActive }) => `flex gap-2 items-center justify-start ${isActive ? 'text-rose-500' : 'cursor-pointer'}`}>
                        <TbLogout className='h-4 w-4 text-rose-500' />
                        <div className='w-[120px]'>Sign out</div>
                    </NavLink>
                </div>
            </aside>
        </div>
    )
}