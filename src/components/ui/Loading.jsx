import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'hero') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-gray-800">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="h-8 bg-white/20 rounded-lg w-48 animate-pulse" />
        </div>
      </div>
    )
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'form') {
    return (
      <div className="card max-w-2xl mx-auto animate-pulse">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
      />
    </div>
  )
}

export default Loading