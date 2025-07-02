import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ReactSlider from 'react-slider'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { pricingService } from '@/services/api/pricingService'

const PricingCalculator = ({ service, onPriceChange, initialConfig = {} }) => {
  const [addOns, setAddOns] = useState([])
  const [durationOptions, setDurationOptions] = useState({})
  const [selectedAddOns, setSelectedAddOns] = useState(initialConfig.addOns || [])
  const [selectedDuration, setSelectedDuration] = useState(initialConfig.duration || null)
  const [pricing, setPricing] = useState({
    basePrice: service.basePrice,
    addOnTotal: 0,
    durationMultiplier: 1.0,
    totalPrice: service.basePrice,
    breakdown: {
      base: service.basePrice,
      addOns: 0,
      duration: '1x',
      total: service.basePrice
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPricingData()
  }, [service.category])

  useEffect(() => {
    calculatePricing()
  }, [selectedAddOns, selectedDuration, service.basePrice])

  const loadPricingData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [availableAddOns, durationOpts] = await Promise.all([
        pricingService.getAvailableAddOns(service.category),
        pricingService.getDurationOptions(service.category)
      ])
      
      setAddOns(availableAddOns)
      setDurationOptions(durationOpts)
      
      // Set default duration if not already set
      if (!selectedDuration && Object.keys(durationOpts).length > 0) {
        const defaultDuration = Object.entries(durationOpts)[1] || Object.entries(durationOpts)[0]
        if (defaultDuration) {
          setSelectedDuration({
            name: defaultDuration[0],
            ...defaultDuration[1]
          })
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load pricing options')
      toast.error('Failed to load pricing options')
    } finally {
      setLoading(false)
    }
  }

  const calculatePricing = async () => {
    try {
      const newPricing = await pricingService.calculatePrice(
        service.Id,
        service.basePrice,
        selectedAddOns,
        selectedDuration
      )
      
      setPricing(newPricing)
      
      // Notify parent component of price change
      if (onPriceChange) {
        onPriceChange({
          ...newPricing,
          selectedAddOns,
          selectedDuration,
          service: service
        })
      }
    } catch (err) {
      toast.error('Failed to calculate pricing')
    }
  }

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId)
      } else {
        return [...prev, addOnId]
      }
    })
  }

  const handleDurationChange = (durationName) => {
    const duration = durationOptions[durationName]
    if (duration) {
      setSelectedDuration({
        name: durationName,
        ...duration
      })
    }
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="text-center py-8">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadPricingData} variant="secondary" size="sm">
          Try Again
        </Button>
      </Card>
    )
  }

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Customize Your Service
          </h3>
          <p className="text-gray-600">
            Personalize your {service.name.toLowerCase()} experience
          </p>
        </div>

        {/* Duration Options */}
        {Object.keys(durationOptions).length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary flex items-center gap-2">
              <ApperIcon name="Clock" className="w-4 h-4" />
              Service Duration
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(durationOptions).map(([name, option]) => (
                <button
                  key={name}
                  onClick={() => handleDurationChange(name)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDuration?.name === name
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-gray-200 hover:border-accent/50'
                  }`}
                >
                  <div className="font-medium text-sm">{name}</div>
                  <div className="text-xs text-gray-500">
                    {option.multiplier !== 1.0 && (
                      <span className={option.multiplier < 1.0 ? 'text-green-600' : 'text-orange-600'}>
                        {option.multiplier < 1.0 ? 'Save ' : 'Premium '}
                        {Math.abs((1 - option.multiplier) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add-Ons */}
        {addOns.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary flex items-center gap-2">
              <ApperIcon name="Plus" className="w-4 h-4" />
              Premium Add-Ons
            </h4>
            <div className="space-y-2">
              {addOns.map((addOn) => (
                <motion.div
                  key={addOn.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAddOns.includes(addOn.Id)
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-200 hover:border-accent/50'
                  }`}
                  onClick={() => handleAddOnToggle(addOn.Id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedAddOns.includes(addOn.Id)
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <ApperIcon name={addOn.icon} className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-primary">
                          {addOn.name}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {addOn.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-accent">
                        +${addOn.price}
                      </div>
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ml-auto">
                        {selectedAddOns.includes(addOn.Id) && (
                          <ApperIcon name="Check" className="w-3 h-3 text-accent" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="bg-secondary rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-primary">Price Breakdown</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Service</span>
              <span className="font-medium">${pricing.breakdown.base}</span>
            </div>
            
            {pricing.breakdown.addOns > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Add-ons ({selectedAddOns.length})</span>
                <span className="font-medium">+${pricing.breakdown.addOns}</span>
              </div>
            )}
            
            {selectedDuration && selectedDuration.multiplier !== 1.0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Duration Adjustment ({pricing.breakdown.duration})
                </span>
                <span className={`font-medium ${
                  selectedDuration.multiplier < 1.0 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {selectedDuration.multiplier < 1.0 ? '-' : '+'}
                  ${Math.abs(pricing.breakdown.total - (pricing.breakdown.base + pricing.breakdown.addOns)).toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="font-semibold text-primary">Total</span>
              <span className="text-2xl font-display font-bold text-accent">
                ${pricing.breakdown.total}
              </span>
            </div>
          </div>
          
          {selectedDuration && (
            <div className="text-xs text-gray-500 text-center">
              Estimated duration: {selectedDuration.duration} minutes
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default PricingCalculator