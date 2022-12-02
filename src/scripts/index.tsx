import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardStructure from '../components/Dashboard/DashboardStructure'
import '../assets/styles/tailwind.css'
import OAuth from './oauth'
import Authentication from '../components/Authentication/Authentication'
import Account from '../components/Account/Account'
import Orders from '../components/Orders/Orders'
import CreateOrderModal from '../components/Orders/CreateOrder'
import EditOrderModal from '../components/Orders/EditOrder'
import ViewOrderModal from '../components/Orders/ViewOrder'

export default function Main() {
    (!OAuth.isAuthorized && location.pathname !== '/authentication') ? location.href = '/authentication' : ''

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard/' element={<DashboardStructure />}>
                    <Route path='orders/' element={<Orders />} >
                        <Route path='create' element={<CreateOrderModal />} />
                        <Route path='edit/:orderId' element={<EditOrderModal />} />
                        <Route path='view/:orderId' element={<ViewOrderModal />} />
                    </Route>
                    <Route path='account/' element={<Account />} />
                </Route>
                <Route path='/authentication/*' element={<Authentication />} />
                <Route path='*' element={<Navigate to={OAuth.isAuthorized ? '/dashboard' : '/authentication'} />} />
            </Routes>
        </BrowserRouter >
    )
}

const root = createRoot(document.querySelector('body > div'))
root.render(<Main />)