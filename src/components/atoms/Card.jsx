import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'card'
  const hoverClasses = hover ? 'hover:scale-102 hover:shadow-xl' : ''
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card