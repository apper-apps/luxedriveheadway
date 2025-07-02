import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent to-yellow-600 text-white hover:scale-102 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
  }`

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} className="w-4 h-4" />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} className="w-4 h-4" />
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button