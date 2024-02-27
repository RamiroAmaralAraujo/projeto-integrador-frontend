import NotFoundAnimado from '../../assets/NotFoundAnimado.svg'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'




export function NotFound() {

  const navigate = useNavigate()

  return (

    <>
      <h4 className=' w-screen absolute mt-16 font-bold text-brand-blue-400 text-center'>Humm... parece não existe essa pagina que você está procurando.</h4>
      <span className=' w-screen absolute mt-20 font-semibold text-brand-blue-400 text-center'>Sem problemas, clique no botão abaixo, para retornar a pagina inicial.</span>

      <div className='absolute flex justify-center w-full mt-32  '>
        <Button label='Retornar a Tela inicial' onClick={() => navigate('/')}></Button>
      </div>
      <div className='h-full w-full justify-center flex items-center '>

        <div className='flex items-center justify-center'>
          <img src={NotFoundAnimado} alt="Animação Notfound" width={720} />
        </div>
      </div>

    </>

  )
}