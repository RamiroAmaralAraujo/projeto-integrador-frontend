import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { JwtPayload, jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { api } from '../service/api'
import { useNavigate } from 'react-router-dom'

type User = {
  userId: string
  empresaNome: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user?: User
  isAuthenticated: boolean
  isAuthenticating: boolean
}

type Response = {
  access_token: string
}

type Error = {
  message: string
  statusCode: number
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isAuthenticating, setAuthenticating] = useState(true)

  const isAuthenticated = !!user
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      getUserFromToken(storedToken)
    }

    setAuthenticating(false)
  }, [])

  function getUserFromToken(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const userData = decodedToken?.sub as User | undefined

    if (userData) {
      setUser({
        empresaNome: userData.empresaNome,
        userId: userData.userId,
      })
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<Response>('auth/login', {
        email,
        password,
      })

      const token = response.data.access_token
      localStorage.setItem('token', token)

      getUserFromToken(token)

      navigate('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError<Error>(error)) {
        toast(error.response?.data.message)
      }
    }
  }

  function signOut() {
    localStorage.removeItem('token')
    setUser(undefined)
    api.defaults.headers.common.Authorization = undefined
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isAuthenticated, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
