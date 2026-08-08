import Navbar from './Navbar.jsx'
import AppRouter from './router.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <AppRouter />
      </div>
    </div>
  )
}
