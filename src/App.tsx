import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

//Layout
import MainLayout from './components/layouts/Main'
import DashboardLayout from './components/layouts/User'
import Persist from './components/layouts/Persist'

//Auth
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))

//Dashboard
import Dashboard from './pages/dashboard'
import Transfers from './pages/dashboard/transfers'
import TransferDetails from './pages/dashboard/transfers/TransferDetails'
import NewTransfer from './pages/dashboard/transfers/New'
import Beneficiaries from './pages/dashboard/beneficiaries'
import KYCDocuments from './pages/dashboard/kyc'
import Messages from './pages/dashboard/messages'
import Help from './pages/dashboard/help'

// Info
import NotFound from './pages/NotFound'
import AccountCreated from './pages/AccountCreated'
import AppLayout from './components/layouts/AppLayout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<Persist />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="transfers/:id" element={<TransferDetails />} />
            <Route path="transfers/new" element={<NewTransfer />} />
            <Route path="beneficiaries" element={<Beneficiaries />} />
            <Route path="kyc" element={<KYCDocuments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          } />
          <Route path="signup" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          } />
          <Route path="forgot-password" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ForgotPassword />
            </Suspense>
          } />
          <Route path="account-successful" element={<AccountCreated />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
