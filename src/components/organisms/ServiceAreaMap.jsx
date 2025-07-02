import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Polygon, Popup, TileLayer, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { servicesService } from "@/services/api/servicesService";

// Mock service zone data
const serviceZones = [
  {
    Id: 1,
    name: 'Downtown',
    status: 'active',
    coordinates: [
      [25.7617, -80.1918],
      [25.7717, -80.1918],
      [25.7717, -80.1818],
      [25.7617, -80.1818]
    ],
    services: ['Driver', 'Car Wash'],
    responseTime: '5-10 min',
    drivers: 15,
    color: '#22c55e'
  },
  {
    Id: 2,
    name: 'Airport Area',
    status: 'active',
    coordinates: [
      [25.7917, -80.2918],
      [25.8017, -80.2918],
      [25.8017, -80.2818],
      [25.7917, -80.2818]
    ],
    services: ['Driver'],
    responseTime: '3-8 min',
    drivers: 8,
    color: '#22c55e'
  },
  {
    Id: 3,
    name: 'Beach District',
    status: 'limited',
    coordinates: [
      [25.7517, -80.1318],
      [25.7617, -80.1318],
      [25.7617, -80.1218],
      [25.7517, -80.1218]
    ],
    services: ['Car Wash'],
    responseTime: '15-25 min',
    drivers: 3,
    color: '#f59e0b'
  },
  {
    Id: 4,
    name: 'North District',
    status: 'unavailable',
    coordinates: [
      [25.8217, -80.1918],
      [25.8317, -80.1918],
      [25.8317, -80.1818],
      [25.8217, -80.1818]
    ],
    services: [],
    responseTime: 'N/A',
    drivers: 0,
    color: '#ef4444'
  }
]

const MapController = ({ selectedZone, onZoneSelect }) => {
  const map = useMap()

  useEffect(() => {
    if (selectedZone) {
      const zone = serviceZones.find(z => z.Id === selectedZone)
      if (zone) {
        const bounds = zone.coordinates
        map.fitBounds(bounds, { padding: [20, 20] })
      }
    }
  }, [selectedZone, map])

  return null
}

const ServiceAreaMap = ({ onZoneChange, cityName = 'Miami' }) => {
  const [selectedZone, setSelectedZone] = useState(null)
  const [zoneServices, setZoneServices] = useState([])
  const [loading, setLoading] = useState(false)

  const mapCenter = [25.7617, -80.1918] // Miami coordinates
  const mapZoom = 12

  const handleZoneSelect = async (zone) => {
    setSelectedZone(zone.Id)
    setLoading(true)
    
    try {
      const services = await servicesService.getServicesByZone(zone.Id)
      setZoneServices(services)
      onZoneChange?.(zone, services)
    } catch (error) {
      console.error('Failed to load zone services:', error)
      setZoneServices([])
    } finally {
      setLoading(false)
    }
  }

  const getZoneStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle'
      case 'limited':
        return 'AlertCircle'
      case 'unavailable':
        return 'XCircle'
      default:
        return 'Circle'
    }
  }

  const getZoneStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Fully Available'
      case 'limited':
        return 'Limited Service'
      case 'unavailable':
        return 'Unavailable'
      default:
        return 'Unknown'
    }
  }

  const selectedZoneData = useMemo(() => {
    return serviceZones.find(z => z.Id === selectedZone)
  }, [selectedZone])

  return (
    <div className="w-full">
      {/* Map Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
        >
          Service Areas in {cityName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Explore our service zones and availability. Click on any area to view services and response times.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 md:h-[500px] relative">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                className="h-full w-full"
                zoomControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {serviceZones.map((zone) => (
                  <Polygon
                    key={zone.Id}
                    positions={zone.coordinates}
                    pathOptions={{
                      fillColor: zone.color,
                      fillOpacity: selectedZone === zone.Id ? 0.7 : 0.4,
                      color: zone.color,
                      weight: selectedZone === zone.Id ? 3 : 2,
                      opacity: 0.8
                    }}
                    eventHandlers={{
                      click: () => handleZoneSelect(zone)
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <ApperIcon 
                            name={getZoneStatusIcon(zone.status)} 
                            className={`w-5 h-5 ${
                              zone.status === 'active' ? 'text-green-500' :
                              zone.status === 'limited' ? 'text-yellow-500' :
                              'text-red-500'
                            }`}
                          />
                          <h3 className="font-semibold text-primary">{zone.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {getZoneStatusText(zone.status)}
                        </p>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-medium">{zone.responseTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Available Drivers:</span>
                            <span className="font-medium">{zone.drivers}</span>
                          </div>
                        </div>
                        {zone.services.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {zone.services.map((service) => (
                                <span
                                  key={service}
                                  className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Polygon>
                ))}
                
                <MapController 
                  selectedZone={selectedZone} 
                  onZoneSelect={setSelectedZone}
                />
              </MapContainer>
            </div>
          </div>
        </motion.div>

        {/* Zone Information Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Zone List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Service Zones</h3>
            <div className="space-y-3">
              {serviceZones.map((zone) => (
                <button
                  key={zone.Id}
                  onClick={() => handleZoneSelect(zone)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedZone === zone.Id
                      ? 'border-accent bg-accent/5'
                      : 'border-gray-200 hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary">{zone.name}</span>
                    <ApperIcon 
                      name={getZoneStatusIcon(zone.status)} 
                      className={`w-4 h-4 ${
                        zone.status === 'active' ? 'text-green-500' :
                        zone.status === 'limited' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{zone.responseTime}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Zone Details */}
          {selectedZoneData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">
                {selectedZoneData.name} Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    selectedZoneData.status === 'active' ? 'text-green-600' :
                    selectedZoneData.status === 'limited' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {getZoneStatusText(selectedZoneData.status)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium">{selectedZoneData.responseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Drivers:</span>
                  <span className="font-medium">{selectedZoneData.drivers}</span>
                </div>
                {selectedZoneData.services.length > 0 && (
                  <div>
                    <span className="text-gray-600 block mb-2">Available Services:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedZoneData.services.map((service) => (
                        <span
                          key={service}
                          className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedZoneData.status === 'active' && (
                  <Button variant="primary" className="w-full mt-4">
                    Book Service in {selectedZoneData.name}
                  </Button>
                )}
              </div>
</div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceAreaMap