import { Page } from '@/components/Page'
import constructionAnimate from '../../assets/constructionAnimate.svg'

export function DashboardConstruction() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Dashboard" />
      </Page.Header>
      <div className='flex flex-col w-full justify-center items-center'>
        <div className=' '>
          <h4 className=' font-bold text-brand-blue-400 text-center'>Essa funcionalidade ainda não está disponivel.</h4>
          <span className=' font-semibold text-brand-blue-400 text-center'>Logo você poderá utilizar esse dashboard, por favor aguarde.</span>
        </div>
        <img src={constructionAnimate} alt="Animação Bild" width={700} className='bg-gray-50 rounded-xl' />
      </div>
    </Page.Root>
  );
}