import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'

type User = {
  userName: string
  email: string
  cpf: string
  password: string
  master: boolean
}

async function signUp(data: User) {
  const response = await api.post('usuarios', data)
  return response.data

}

export function useSignUp() {

  return useMutation<any, AxiosError, User>(signUp, {
    onSuccess(_: User) {

    },
    onError() { },
  })
}
