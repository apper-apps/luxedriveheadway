import Navigation from '@/components/molecules/Navigation'
import Footer from '@/components/molecules/Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout