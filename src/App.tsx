import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

//Layout
import MainLayout from './components/layouts/Main'
import DashboardLayout from './components/layouts/User'

//Auth
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))

//Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))
const Transfers = lazy(() => import('./pages/dashboard/transfers'))
const TransferDetails = lazy(() => import('./pages/dashboard/transfers/TransferDetails'))
const NewTransfer = lazy(() => import('./pages/dashboard/transfers/New'))
const Beneficiaries = lazy(() => import('./pages/dashboard/beneficiaries'))
const KYCDocuments = lazy(() => import('./pages/dashboard/kyc'))
import Messages from './pages/dashboard/messages'
import Help from './pages/dashboard/help'

// Info
import NotFound from './pages/NotFound'
import AccountCreated from './pages/AccountCreated'


function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="transfers" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Transfers />
          </Suspense>
        } />
        <Route path="transfers/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <TransferDetails />
          </Suspense>
        } />
        <Route path="transfers/new" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NewTransfer />
          </Suspense>
        } />
        <Route path="beneficiaries" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Beneficiaries />
          </Suspense>
        } />
        <Route path="kyc" element={
          <Suspense fallback={<div>Loading...</div>}>
            <KYCDocuments />
          </Suspense>
        } />
        <Route path="messages" element={<Messages />} />
        <Route path="help" element={<Help />} />
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
