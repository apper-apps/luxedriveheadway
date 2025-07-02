import HeroSection from '@/components/organisms/HeroSection'
import ServicesGrid from '@/components/organisms/ServicesGrid'
import TestimonialSection from '@/components/organisms/TestimonialSection'
import { motion } from 'framer-motion'
import { useState } from 'react'
import BookingForm from '@/components/molecules/BookingForm'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const HomePage = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData)
    setShowBookingForm(false)
    setSelectedService(null)
  }

  const features = [
    {
      icon: 'Car',
      title: 'Premium Car Wash',
      description: 'Professional detailing services that keep your vehicle in pristine condition'
    },
    {
      icon: 'Users',
      title: 'Professional Chauffeurs',
      description: 'Experienced, licensed drivers who provide safe and comfortable transportation'
    },
    {
      icon: 'Clock',
      title: '24/7 Availability',
      description: 'Round-the-clock service to meet your schedule, whenever you need us'
    },
    {
      icon: 'Shield',
      title: 'Fully Insured',
      description: 'Complete insurance coverage for your peace of mind and protection'
    }
  ]

  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-primary mb-4"
            >
              Our Premium Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose from our range of premium car services designed for the discerning professional
            </motion.p>
          </div>

          <ServicesGrid 
            onServiceSelect={handleServiceSelect}
            featured={true}
          />

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg" icon="ArrowRight">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-primary mb-4"
            >
              Why Choose LuxeDrive
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Experience the difference that premium quality and exceptional service makes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Ready to Experience Luxury?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Join thousands of satisfied clients who trust LuxeDrive for their premium car service needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" icon="Calendar">
              Book Your Service
            </Button>
            <Button variant="outline" size="lg" icon="Phone" className="text-white border-white hover:bg-white hover:text-primary">
              Call Us Now
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

export default HomePage