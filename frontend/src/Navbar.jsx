import { Link, useNavigate } from 'react-router-dom'
import { routes } from './router.jsx'
import { useAuth } from './modules/auth/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        <Link to="/" className="text-xl font-black text-blue-600">Fitness Goal Road</Link>

        <div className="flex items-center gap-6 flex-wrap">
          {user && routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {route.label}
            </Link>
          ))}

          {user ? (
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">
              Log Out ({user.prenom})
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Log In</Link>
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
