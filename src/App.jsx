import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import ServicesPage from '@/components/pages/ServicesPage'
import CarWashPage from '@/components/pages/CarWashPage'
import DriverHirePage from '@/components/pages/DriverHirePage'
import LocationPage from '@/components/pages/LocationPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/car-wash" element={<CarWashPage />} />
            <Route path="/driver-hire" element={<DriverHirePage />} />
            <Route path="/driver-hire/:city" element={<LocationPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  )
}

export default App