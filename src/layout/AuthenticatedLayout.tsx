import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { LoadingFullscreen } from '../components/LoadingFull/LoadingFullscreen'

export function AuthenticatedLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth()
  console.log({ isAuthenticating, isAuthenticated })

  const location = useLocation()

  if (!isAuthenticating) {
    return <LoadingFullscreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }


  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}
