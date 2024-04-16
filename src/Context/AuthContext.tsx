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
import { EmpresasData } from '@/hook/queries/useEmpresas'

type User = {
  sub: string
  userName: string
  userCPF: string
  userEmail: string
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
  empresaSelecionada?: EmpresasData
  setEmpresaSelecionada?: (empresa: EmpresasData) => void
}

type Response = {
  accessToken: string
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
  const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresasData>()
  const [user, setUser] = useState<User>()
  const [isAuthenticating, setAuthenticating] = useState(false)


  const isAuthenticated = !!user
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmpresa = localStorage.getItem('EmpresaStorage')

    if (storedToken) {
      getUserFromToken(storedToken)
    }

    if (storedEmpresa) {
      getEmpresaFromStorage(storedEmpresa)
    }

    setAuthenticating(true)
  }, [])

  function getUserFromToken(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const userData = decodedToken as User | undefined

    if (userData) {
      setUser({
        sub: userData.sub,
        userName: userData.userName,
        userCPF: userData.userCPF,
        userEmail: userData.userEmail
      })
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<Response>('auth/login', {
        email,
        password,
      });

      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      toast.success("Você será redirecionado a Pagina de usuário.");

      getUserFromToken(token);


      navigate('/loading');


      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } catch (error: unknown) {
      if (axios.isAxiosError<Error>(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  function signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('EmpresaStorage')
    setEmpresaSelecionada(undefined)
    setUser(undefined)
    api.defaults.headers.common.Authorization = undefined
    navigate('/')
  }


  async function getEmpresaFromStorage(storedEmpresa: string) {
    const id = storedEmpresa
    const response = await api.get(`empresas/${id}`)
    const empresaSelecionada = response.data
    setEmpresaSelecionada(empresaSelecionada)
    console.log({ empresaSelecionada })
  }



  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isAuthenticated, isAuthenticating, empresaSelecionada, setEmpresaSelecionada }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)