import mockDriversData from '@/services/mockData/drivers.json'

const { mockDrivers } = mockDriversData
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const driversService = {
  async getAll() {
    await delay(300)
    return [...mockDrivers]
  },

  async getById(id) {
    await delay(200)
    const driver = mockDrivers.find(d => d.Id === parseInt(id))
    if (!driver) {
      throw new Error('Driver not found')
    }
    return { ...driver }
  },

  async create(driverData) {
    await delay(400)
    const maxId = Math.max(...mockDrivers.map(d => d.Id), 0)
    const newDriver = {
      ...driverData,
      Id: maxId + 1
    }
    mockDrivers.push(newDriver)
    return { ...newDriver }
  },

  async update(id, driverData) {
    await delay(350)
    const index = mockDrivers.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Driver not found')
    }
    mockDrivers[index] = {
      ...mockDrivers[index],
      ...driverData,
      Id: parseInt(id)
    }
    return { ...mockDrivers[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockDrivers.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Driver not found')
    }
    const deletedDriver = { ...mockDrivers[index] }
    mockDrivers.splice(index, 1)
    return deletedDriver
  }
}