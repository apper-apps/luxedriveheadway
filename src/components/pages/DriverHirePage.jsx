import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ServiceCard from '@/components/molecules/ServiceCard'
import BookingForm from '@/components/molecules/BookingForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { servicesService } from '@/services/api/servicesService'
import { driversService } from '@/services/api/driversService'

const DriverHirePage = () => {
  const [driverServices, setDriverServices] = useState([])
  const [topDrivers, setTopDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [allServices, allDrivers] = await Promise.all([
        servicesService.getAll(),
        driversService.getAll()
      ])
      
      const driverServices = allServices.filter(service => service.category === 'Driver')
      const topDrivers = allDrivers.slice(0, 6)
      
      setDriverServices(driverServices)
      setTopDrivers(topDrivers)
    } catch (err) {
      setError(err.message || 'Failed to load driver services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData)
    setShowBookingForm(false)
    setSelectedService(null)
    toast.success('Driver booking confirmed!')
  }

  const handleRetry = () => {
    loadData()
  }

  const serviceFeatures = [
    { icon: 'Shield', title: 'Licensed & Insured', description: 'All drivers are fully licensed and insured' },
    { icon: 'Clock', title: 'Punctual Service', description: 'On-time arrival guaranteed' },
    { icon: 'Star', title: 'Professional Drivers', description: 'Experienced and courteous professionals' },
    { icon: 'Car', title: 'Premium Vehicles', description: 'Well-maintained luxury vehicles' }
  ]

  const popularCities = [
    'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco',
    'Las Vegas', 'Boston', 'Seattle', 'Dallas', 'Atlanta'
  ]

  if (loading) {
    return (
      <div className="pt-16">
        <Loading type="hero" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-16">
        <Error message={error} onRetry={handleRetry} />
      </div>
    )
  }

  if (!driverServices || driverServices.length === 0) {
    return (
      <div className="pt-16">
        <Empty
          title="No Driver Services Available"
          description="We're currently updating our driver hire offerings. Please check back soon."
          icon="Users"
        />
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Professional Chauffeur Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Experience luxury transportation with our professional chauffeur services. 
              Reliable, safe, and sophisticated travel for every occasion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" icon="Users">
                Hire Driver Now
              </Button>
              <Button variant="outline" size="lg" icon="MapPin" className="text-white border-white hover:bg-white hover:text-primary">
                Find Local Drivers
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Choose Your Service
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              From hourly services to full-day chauffeur, we have the perfect option for your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {driverServices.map((service, index) => (
              <motion.div
                key={service.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  onSelect={handleServiceSelect}
                  featured={index === 1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Drivers */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Meet Our Professional Drivers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Experienced, professional, and courteous drivers ready to serve you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDrivers.map((driver, index) => (
              <motion.div
                key={driver.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="User" className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {driver.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <ApperIcon
                        key={i}
                        name="Star"
                        className={`w-4 h-4 ${
                          i < Math.floor(driver.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({driver.rating})
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {driver.experience} years experience
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {driver.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="text-lg font-semibold text-accent mb-4">
                    ${driver.hourlyRate}/hour
                  </div>
                  <Button variant="secondary" size="sm" className="w-full">
                    Book {driver.name}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Why Choose Our Drivers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Experience the difference that professional service makes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Available in Your City
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Professional chauffeur services available in major cities across the country
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularCities.map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/driver-hire/${city.toLowerCase()}`}
                  className="card text-center hover:scale-102 block"
                >
                  <ApperIcon name="MapPin" className="w-6 h-6 text-accent mx-auto mb-2" />
                  <h3 className="font-medium text-primary">{city}</h3>
                  <p className="text-sm text-gray-600">Driver Hire</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Need a Professional Driver?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Book your professional chauffeur service today and travel in comfort and style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="primary" size="lg" icon="Calendar">
              Book Driver Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowBookingForm(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform"
              >
                <ApperIcon name="X" className="w-5 h-5 text-primary" />
              </button>
              <BookingForm
                service={selectedService}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DriverHirePage