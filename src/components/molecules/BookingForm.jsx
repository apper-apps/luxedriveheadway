import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const BookingForm = ({ service, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const booking = {
        ...formData,
        serviceId: service.Id,
        serviceName: service.name,
        totalPrice: service.basePrice,
        bookingId: `LX${Date.now()}`,
        status: 'confirmed'
      }
      
      onSubmit(booking)
      toast.success('Booking confirmed! You will receive a confirmation email shortly.')
      
      // Reset form
      setFormData({
        date: '',
        time: '',
        location: '',
        name: '',
        phone: '',
        email: '',
        notes: ''
      })
    } catch (error) {
      toast.error('Failed to process booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ]

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-semibold text-primary mb-2">
          Book {service.name}
        </h3>
        <p className="text-gray-600">
          Fill out the details below to complete your booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Preferred Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary mb-2">
              Preferred Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Service Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your address"
          icon="MapPin"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            icon="User"
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            icon="Phone"
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          icon="Mail"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Any special requests or instructions..."
          />
        </div>

        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-primary">Total Amount:</span>
            <span className="text-2xl font-display font-bold text-accent">
              ${service.basePrice}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
          icon="Calendar"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </form>
    </Card>
  )
}

export default BookingForm