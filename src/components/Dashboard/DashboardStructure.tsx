import * as React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'

export default function DashboardStructure() {
    return (
        <div className='h-full grid grid-cols-[175px_auto] min-w-[650px] overflow-hidden max-w-[1150px] tall:max-w-[1000px] m-auto border-x border-x-gray-200'>
            <NavigationMenu toggleVisibility={() => { }} />
            <div className='border-l border-l-gray-200 overflow-y-auto'>
                <div className='overflow-y-auto'>
                    <div className='p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}