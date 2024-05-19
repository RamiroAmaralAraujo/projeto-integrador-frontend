import { useSwiper } from 'swiper/react';
import { ChevronLeft } from 'lucide-react';



export const ButtonLeft = () => {
  const swiper = useSwiper();

  return (
    <div>
        <button className='bg-brand-blue-500 rounded-full w-10 h-10 flex justify-center items-center' onClick={() => swiper.slidePrev()}><ChevronLeft color='white' /></button>
    </div>
  );
};