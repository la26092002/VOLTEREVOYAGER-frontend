import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Order from '../pages/Order'
import AdminLogin from '../pages/AdminLogin'
import AdminOrders from '../pages/AdminOrders'
import Tracking from '../pages/Tracking'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminOrders />
          </ProtectedRoute>
        }
      />
      <Route path="/track/:id" element={<Tracking />} />
    </Routes>
  )
}
