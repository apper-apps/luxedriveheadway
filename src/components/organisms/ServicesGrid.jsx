import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '@/components/molecules/ServiceCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { servicesService } from '@/services/api/servicesService'

const ServicesGrid = ({ onServiceSelect, featured = false }) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadServices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await servicesService.getAll()
      setServices(data)
    } catch (err) {
      setError(err.message || 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleRetry = () => {
    loadServices()
  }

  if (loading) {
    return <Loading type="cards" />
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={handleRetry}
      />
    )
  }

  if (!services || services.length === 0) {
    return (
      <Empty
        title="No Services Available"
        description="We're currently updating our service offerings. Please check back soon."
        icon="Car"
      />
    )
  }

  const displayServices = featured ? services.slice(0, 3) : services

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayServices.map((service, index) => (
        <motion.div
          key={service.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ServiceCard
            service={service}
            onSelect={onServiceSelect}
            featured={featured && index === 1}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ServicesGrid