import { Page } from '@/components/Page'
import constructionAnimate from '../../assets/constructionAnimate.svg'
import { SelectEmpresaButton } from '@/components/SelectEmpresaButton/SelectEmpresaButton';


export function Produtos() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Produtos" />
        <SelectEmpresaButton />
      </Page.Header>


      <div className='flex flex-col w-full justify-center items-center'>
        <div className=' '>
          <h4 className=' font-bold text-brand-blue-400 text-center'>Essa funcionalidade ainda não está disponivel.</h4>
          <span className=' font-semibold text-brand-blue-400 text-center'>Logo você poderá utilizar o gerenciamento do produtos, por favor aguarde.</span>
        </div>
        <img src={constructionAnimate} alt="Animação Bild" width={700} className='bg-gray-50 rounded-xl' />
      </div>


    </Page.Root>
  );
}