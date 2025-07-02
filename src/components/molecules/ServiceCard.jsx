import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const ServiceCard = ({ service, onSelect, featured = false }) => {
  return (
    <Card className={`relative ${featured ? 'ring-2 ring-accent' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-accent to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center ${
          featured 
            ? 'bg-gradient-to-br from-accent to-yellow-600 text-white' 
            : 'bg-accent/10 text-accent'
        }`}>
          <ApperIcon name={service.icon} className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-primary mb-2">
          {service.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
        
        <div className="mb-6">
          <span className="text-3xl font-display font-bold text-primary">
            ${service.basePrice}
          </span>
          <span className="text-gray-500 ml-1">
            {service.priceUnit}
          </span>
        </div>
        
        <ul className="space-y-2 mb-8">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <ApperIcon name="Check" className="w-4 h-4 text-success flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button
          variant={featured ? 'primary' : 'secondary'}
          className="w-full"
          onClick={() => onSelect(service)}
        >
          Select Service
        </Button>
      </div>
    </Card>
  )
}

export default ServiceCard