import { Link } from 'react-router-dom';

export function ContentFooter(){
    return(
      <>
        <div className='text-xs flex flex-col items-center justify-center gap-1'>
          <p>© 2024 CoreCommerce. Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0000-00</p>
          <p><Link to="/termos-de-uso" target="_blank" className='text-blue-700'>Termos e Condições de Uso</Link> | <Link to="/politica-de-privacidade" target="_blank" className='text-blue-700'>Política de privacidade</Link></p>
          
        </div>
      </>
    )
}