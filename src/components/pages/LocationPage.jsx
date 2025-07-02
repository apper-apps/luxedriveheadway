import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ServiceCard from '@/components/molecules/ServiceCard'
import BookingForm from '@/components/molecules/BookingForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { servicesService } from '@/services/api/servicesService'
import { driversService } from '@/services/api/driversService'

const LocationPage = () => {
  const { city } = useParams()
  const [driverServices, setDriverServices] = useState([])
  const [localDrivers, setLocalDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Your City'

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [allServices, allDrivers] = await Promise.all([
        servicesService.getAll(),
        driversService.getAll()
      ])
      
      const driverServices = allServices.filter(service => service.category === 'Driver')
      const localDrivers = allDrivers.filter(driver => 
        driver.cities?.includes(cityName) || allDrivers.slice(0, 4)
      ).slice(0, 4)
      
      setDriverServices(driverServices)
      setLocalDrivers(localDrivers.length > 0 ? localDrivers : allDrivers.slice(0, 4))
    } catch (err) {
      setError(err.message || 'Failed to load location data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [city])

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData)
    setShowBookingForm(false)
    setSelectedService(null)
    toast.success(`Driver booking confirmed for ${cityName}!`)
  }

  const handleRetry = () => {
    loadData()
  }

  const localFeatures = [
    { icon: 'MapPin', title: 'Local Knowledge', description: 'Drivers familiar with local routes and traffic' },
    { icon: 'Clock', title: 'Quick Response', description: 'Fast pickup times in your area' },
    { icon: 'Star', title: 'Top Rated', description: 'Highest rated drivers in your city' },
    { icon: 'Phone', title: '24/7 Support', description: 'Round-the-clock customer service' }
  ]

  const cityStats = {
    drivers: '50+',
    avgRating: '4.9',
    completedRides: '10,000+',
    avgResponse: '5 min'
  }

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
              Driver Hire in {cityName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Professional chauffeur services in {cityName}. Local drivers who know your city inside and out, 
              providing safe and comfortable transportation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="primary" size="lg" icon="MapPin">
                Book Driver in {cityName}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* City Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-transparent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text mb-2">
                {cityStats.drivers}
              </div>
              <div className="text-gray-600">Professional Drivers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-transparent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text mb-2">
                {cityStats.avgRating}★
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-transparent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text mb-2">
                {cityStats.completedRides}
              </div>
              <div className="text-gray-600">Completed Rides</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-transparent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text mb-2">
                {cityStats.avgResponse}
              </div>
              <div className="text-gray-600">Avg Response Time</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services for Location */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Driver Services in {cityName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Choose from our range of professional driver services, all available in {cityName}
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

      {/* Local Drivers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Top Drivers in {cityName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Meet our highly-rated professional drivers serving the {cityName} area
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localDrivers.map((driver, index) => (
              <motion.div
                key={driver.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="User" className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
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
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {driver.experience} years in {cityName}
                  </p>
                  <div className="text-lg font-semibold text-accent mb-3">
                    ${driver.hourlyRate}/hour
                  </div>
                  <Button variant="secondary" size="sm" className="w-full">
                    Book Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Features */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Why Choose Local Drivers in {cityName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our local drivers provide unmatched service with intimate knowledge of {cityName}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localFeatures.map((feature, index) => (
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

      {/* Local SEO Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-6">
              Professional Driver Hire Services in {cityName}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking for reliable driver hire services in {cityName}? LuxeDrive provides premium chauffeur services 
              with professional, licensed drivers who know {cityName} intimately. Whether you need transportation for 
              business meetings, airport transfers, special events, or daily commutes, our experienced drivers deliver 
              exceptional service every time.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our {cityName} driver hire service includes luxury vehicles, punctual arrival times, and courteous 
              professional drivers. We understand the unique transportation needs of {cityName} residents and visitors, 
              providing tailored solutions that ensure comfortable, safe, and reliable travel throughout the city and 
              surrounding areas.
            </p>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Why Choose LuxeDrive in {cityName}?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Licensed and insured professional drivers with extensive {cityName} experience</li>
              <li>Premium fleet of well-maintained luxury vehicles</li>
              <li>24/7 availability for your convenience</li>
              <li>Competitive hourly and daily rates</li>
              <li>Real-time booking and scheduling system</li>
              <li>Excellent customer service and support</li>
            </ul>
          </motion.div>
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
            Ready to Book in {cityName}?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Experience premium chauffeur service in {cityName}. Book your professional driver today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" icon="Calendar">
              Book Driver Now
            </Button>
            <Button variant="outline" size="lg" icon="Phone" className="text-white border-white hover:bg-white hover:text-primary">
              Call {cityName} Office
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

export default LocationPage