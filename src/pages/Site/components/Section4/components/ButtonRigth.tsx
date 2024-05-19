import { useSwiper } from 'swiper/react';
import { ChevronRight } from 'lucide-react';



export const ButtonRight = () => {
  const swiper = useSwiper();

  return (
    <div>
        <button className='bg-brand-blue-500 rounded-full w-10 h-10 flex justify-center items-center' onClick={() => swiper.slideNext()}><ChevronRight color='white' /></button>
    </div>
  );
};