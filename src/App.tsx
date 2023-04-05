import { Routes, Route } from 'react-router-dom'

//Layout
import MainLayout from './components/layouts/Main'
import DashboardLayout from './components/layouts/User'

//Auth
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'

//Dashboard
import Dashboard from './pages/dashboard'
import Transfers from './pages/dashboard/transfers'
import TransferDetails from './pages/dashboard/transfers/TransferDetails'
import NewTransfer from './pages/dashboard/transfers/New'
import Beneficiaries from './pages/dashboard/beneficiaries'
import KYCDocuments from './pages/dashboard/kyc'
import Messages from './pages/dashboard/messages'
import Help from './pages/dashboard/help'



function App() {
  return (
    <Routes>
      {/* <Route element={<PrivateRoute />}>
        <Route element={<BottomTabs />}>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="category/:catname" element={<Category />} />
        <Route path="review-orders" element={<ReviewOrder />} />
        <Route path="select-address" element={<SelectAddress />} />
        <Route path="pick-up" element={<PickUp />} />
        <Route path="order/:orderNum" element={<OrderDetails />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/recurring-pickups" element={<RecurringPickups />} />
      </Route> */}
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
      <Route element={<MainLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default App
