const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Add-on definitions for different service categories
const addOnDefinitions = {
  'Car Wash': [
    { Id: 1, name: 'Interior Deep Clean', price: 25, icon: 'Sparkles', description: 'Thorough interior cleaning and sanitization' },
    { Id: 2, name: 'Engine Bay Cleaning', price: 30, icon: 'Settings', description: 'Professional engine compartment cleaning' },
    { Id: 3, name: 'Tire Shine & Dress', price: 15, icon: 'Circle', description: 'Premium tire conditioning and shine' },
    { Id: 4, name: 'Leather Conditioning', price: 20, icon: 'Armchair', description: 'Professional leather treatment and protection' },
    { Id: 5, name: 'Paint Protection', price: 50, icon: 'Shield', description: 'Advanced paint protection coating' },
    { Id: 6, name: 'Headlight Restoration', price: 35, icon: 'Lightbulb', description: 'Restore clarity to foggy headlights' }
  ],
  'Driver': [
    { Id: 7, name: 'Premium Vehicle Upgrade', price: 25, icon: 'Car', description: 'Upgrade to luxury vehicle class' },
    { Id: 8, name: 'Refreshments Package', price: 15, icon: 'Coffee', description: 'Complimentary beverages and snacks' },
    { Id: 9, name: 'Wi-Fi & Charging', price: 10, icon: 'Wifi', description: 'High-speed internet and device charging' },
    { Id: 10, name: 'Meet & Greet Service', price: 20, icon: 'UserCheck', description: 'Personalized arrival and departure service' },
    { Id: 11, name: 'Multiple Stops', price: 30, icon: 'MapPin', description: 'Additional stops during your journey' },
    { Id: 12, name: 'Express Lane Access', price: 25, icon: 'Zap', description: 'Priority routing and express lanes' }
  ]
}

// Duration multipliers for different service types
const durationMultipliers = {
  'Car Wash': {
    'Express (30 min)': { multiplier: 0.8, duration: 30 },
    'Standard (60 min)': { multiplier: 1.0, duration: 60 },
    'Extended (90 min)': { multiplier: 1.3, duration: 90 },
    'Premium (120 min)': { multiplier: 1.6, duration: 120 }
  },
  'Driver': {
    '1 Hour': { multiplier: 1.0, duration: 60 },
    '2 Hours': { multiplier: 1.0, duration: 120 },
    '4 Hours': { multiplier: 0.95, duration: 240 },
    '8 Hours (Full Day)': { multiplier: 0.9, duration: 480 }
  }
}

export const pricingService = {
  async getAvailableAddOns(serviceCategory) {
    await delay(200)
    return [...(addOnDefinitions[serviceCategory] || [])]
  },

  async getDurationOptions(serviceCategory) {
    await delay(150)
    return { ...durationMultipliers[serviceCategory] }
  },

  async calculatePrice(serviceId, basePrice, selectedAddOns = [], durationOption = null) {
    await delay(100)
    
    let totalPrice = basePrice
    let addOnTotal = 0
    let durationMultiplier = 1.0

    // Calculate add-ons total
    selectedAddOns.forEach(addOnId => {
      const addOn = Object.values(addOnDefinitions)
        .flat()
        .find(addon => addon.Id === addOnId)
      if (addOn) {
        addOnTotal += addOn.price
      }
    })

    // Apply duration multiplier
    if (durationOption) {
      durationMultiplier = durationOption.multiplier
    }

    totalPrice = (basePrice + addOnTotal) * durationMultiplier

    return {
      basePrice,
      addOnTotal,
      durationMultiplier,
      totalPrice: Math.round(totalPrice * 100) / 100,
      breakdown: {
        base: basePrice,
        addOns: addOnTotal,
        duration: `${durationMultiplier}x`,
        total: Math.round(totalPrice * 100) / 100
      }
    }
  },

  async getAddOnById(addOnId) {
    await delay(50)
    const addOn = Object.values(addOnDefinitions)
      .flat()
      .find(addon => addon.Id === addOnId)
    return addOn ? { ...addOn } : null
  },

  async validatePricing(serviceId, basePrice, selectedAddOns, durationOption) {
    await delay(100)
    
    // Validate service exists and base price is reasonable
    if (!serviceId || basePrice < 0) {
      throw new Error('Invalid service or pricing')
    }

    // Validate add-ons exist
    for (const addOnId of selectedAddOns) {
      const addOn = await this.getAddOnById(addOnId)
      if (!addOn) {
        throw new Error(`Invalid add-on: ${addOnId}`)
      }
    }

    return true
  }
}