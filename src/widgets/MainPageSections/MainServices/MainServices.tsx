import { MainServicesBlock } from './MainServicesBlocks';
import { MainServicesArr } from 'shared/const/consts';
import { PictureRetoucher } from 'shared/components/PictureRetoucher/PictureRetoucher';
import { retouch1, retouch2 } from 'shared/const/images';

export const MainServices = () => {
   return (
      <section>
         <div className='container'>
            <div className='title-box text-center'>
               <h2 className='leading-[100px] max-w-[800px] mx-auto'>
                  Также мы занимаемся ретушью и реставрацией фотографий
               </h2>
            </div>
            <div className='flex justify-between items-center w-1630:gap-[40px] w-1630:flex-wrap w-1630:justify-center'>
               <div className='section-content max-w-[1150px] '>
                  <div className='flex gap-[30px] w-1160:flex-col'>
                     {MainServicesArr.map(service => (
                        <div
                           key={service.id}
                           className='bg-invertedTextColor p-[30px] rounded-elementRounded shadow-cardShadow'
                        >
                           <MainServicesBlock service={service} />
                        </div>
                     ))}
                  </div>
               </div>
               <PictureRetoucher
                  className='max-w-[400px]'
                  img1={retouch1}
                  img2={retouch2}
               />
            </div>
         </div>
      </section>
   );
};
