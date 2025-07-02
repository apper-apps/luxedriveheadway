import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const serviceLinks = [
    { name: 'Premium Car Wash', path: '/car-wash' },
    { name: 'Chauffeur Service', path: '/driver-hire' },
    { name: 'Corporate Services', path: '/services' },
    { name: 'Special Events', path: '/services' },
  ]

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Locations', path: '/locations' },
    { name: 'Careers', path: '/careers' },
  ]

  const trustBadges = [
    { icon: 'Shield', text: 'Fully Insured' },
    { icon: 'Clock', text: '24/7 Support' },
    { icon: 'Award', text: '5-Star Rated' },
    { icon: 'Users', text: '10K+ Customers' },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Car" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">
                LuxeDrive
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium car services for the discerning professional. Experience luxury, convenience, and unmatched quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <ApperIcon name="Linkedin" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" className="w-5 h-5 text-accent" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="w-5 h-5 text-accent" />
                <span className="text-gray-300">hello@luxedrive.com</span>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-gray-300">
                  123 Luxury Lane<br />
                  Beverly Hills, CA 90210
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name={badge.icon} className="w-5 h-5 text-accent" />
                </div>
                <span className="text-gray-300 text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} LuxeDrive. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer