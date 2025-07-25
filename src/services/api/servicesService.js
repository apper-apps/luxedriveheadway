import mockServicesData from '@/services/mockData/services.json'

const { mockServices } = mockServicesData
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const servicesService = {
  async getAll() {
    await delay(300)
    return [...mockServices]
  },

  async getById(id) {
    await delay(200)
    const service = mockServices.find(s => s.Id === parseInt(id))
    if (!service) {
      throw new Error('Service not found')
    }
    return { ...service }
  },

  async create(serviceData) {
    await delay(400)
    const maxId = Math.max(...mockServices.map(s => s.Id), 0)
    const newService = {
      ...serviceData,
      Id: maxId + 1
    }
    mockServices.push(newService)
    return { ...newService }
  },

  async update(id, serviceData) {
    await delay(350)
    const index = mockServices.findIndex(s => s.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Service not found')
    }
    mockServices[index] = {
      ...mockServices[index],
      ...serviceData,
      Id: parseInt(id)
    }
    return { ...mockServices[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockServices.findIndex(s => s.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Service not found')
    }
const deletedService = { ...mockServices[index] }
    mockServices.splice(index, 1)
    return deletedService
  },

  async getServicesByZone(zoneId) {
    await delay(250)
    // Mock zone-based filtering
    const zoneServiceMap = {
      1: [1, 2, 3, 4, 5, 6], // Downtown - all services
      2: [4, 5, 6], // Airport - driver services only
      3: [1, 2, 3], // Beach - car wash only
      4: [] // North - no services
    }
    
    const serviceIds = zoneServiceMap[zoneId] || []
    const filteredServices = mockServices.filter(s => serviceIds.includes(s.Id))
    return [...filteredServices]
  }
}