import ActiveSlider from './components/ActiveSlider';
import CountUp from 'react-countup';

export function Section4() {
  return (
    <div className=" bg-gray-100 flex justify-center items-center flex-col">
      
      <div className="pt-12 flex flex-col items-center justify-center md:text-xl text-lg">
        <h1 className="font-semibold text-4xl mb-5 text-center">Junte-se a nós</h1>
        <p className="mb-1 flex items-center gap-2 text-brand-blue-200"> <CountUp end={2} duration={5.0} prefix="+"/> anos de mercado | <CountUp end={100} duration={5.0} prefix="+"/> assinantes</p>
        <p className="mb-1 flex items-center gap-2">Veja as avaliações reais dos nossos clientes:</p>
      </div>

      <div className="w-full">
        <ActiveSlider />
      </div>

    </div>
  );
}