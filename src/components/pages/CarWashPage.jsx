import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

const CarWashPage = () => {
  const [carWashServices, setCarWashServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const loadCarWashServices = async () => {
    try {
      setLoading(true)
      setError('')
      const allServices = await servicesService.getAll()
      const carWashServices = allServices.filter(service => service.category === 'Car Wash')
      setCarWashServices(carWashServices)
    } catch (err) {
      setError(err.message || 'Failed to load car wash services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCarWashServices()
  }, [])

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData)
    setShowBookingForm(false)
    setSelectedService(null)
    toast.success('Car wash booking confirmed!')
  }

  const handleRetry = () => {
    loadCarWashServices()
  }

  const addOns = [
    { name: 'Interior Deep Clean', price: 25, icon: 'Sparkles' },
    { name: 'Engine Bay Cleaning', price: 30, icon: 'Settings' },
    { name: 'Tire Shine & Dress', price: 15, icon: 'Circle' },
    { name: 'Leather Conditioning', price: 20, icon: 'Armchair' },
    { name: 'Paint Protection', price: 50, icon: 'Shield' },
    { name: 'Headlight Restoration', price: 35, icon: 'Lightbulb' }
  ]

  const beforeAfterGallery = [
    {
      before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&sat=2&brightness=1.2',
      title: 'Exterior Wash & Wax'
    },
    {
      before: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop',
      after: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop&sat=2&brightness=1.2',
      title: 'Interior Detailing'
    },
    {
      before: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&h=300&fit=crop',
      after: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&h=300&fit=crop&sat=2&brightness=1.2',
      title: 'Complete Detail'
    }
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

  if (!carWashServices || carWashServices.length === 0) {
    return (
      <div className="pt-16">
        <Empty
          title="No Car Wash Services Available"
          description="We're currently updating our car wash offerings. Please check back soon."
          icon="Car"
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
              Premium Car Wash
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Professional car detailing services that restore your vehicle's showroom shine. 
              Experience the difference that premium care makes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="primary" size="lg" icon="Sparkles">
                Book Car Wash Now
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
              Choose Your Package
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              From basic wash to complete detailing, we have the perfect package for your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carWashServices.map((service, index) => (
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

      {/* Add-Ons Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Premium Add-Ons
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Enhance your car wash experience with our specialized add-on services
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:scale-102">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={addon.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {addon.name}
                  </h3>
                  <div className="text-2xl font-display font-bold text-accent mb-4">
                    +${addon.price}
                  </div>
                  <Button variant="secondary" size="sm" className="w-full">
                    Add to Package
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              See the Difference
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Real results from our premium car wash and detailing services
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beforeAfterGallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">
                    {item.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Before</p>
                      <img
                        src={item.before}
                        alt="Before"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">After</p>
                      <img
                        src={item.after}
                        alt="After"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <ApperIcon name="ArrowRight" className="w-5 h-5 text-accent mx-auto" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
            >
              Our Detailing Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Every vehicle receives our meticulous attention to detail
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Droplets', title: 'Pre-Wash', description: 'Thorough rinse and pre-treatment' },
              { icon: 'Soap', title: 'Deep Clean', description: 'Premium soap and careful washing' },
              { icon: 'Sparkles', title: 'Detail Work', description: 'Interior and exterior detailing' },
              { icon: 'Shield', title: 'Protection', description: 'Wax and protective coatings' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={step.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
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
            Ready for a Premium Wash?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Transform your vehicle with our professional car wash and detailing services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="primary" size="lg" icon="Calendar">
              Book Your Car Wash
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

export default CarWashPage