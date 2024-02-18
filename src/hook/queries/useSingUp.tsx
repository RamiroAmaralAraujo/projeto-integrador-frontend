import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { api } from '../../service/api'

type User = {
  usuario: string
  email: string
  password: string
  empresa: string
  cnpj_cpf: string
}

async function signUp(data: User) {
  const response = await api.post('usuarios', data)
  console.log(response.data)
  return response.data

}

export function useSignUp() {

  return useMutation<any, AxiosError, User>(signUp, {
    onSuccess(_: User) {

    },
    onError() { },
  })
}
