import { GetProductsData } from 'features/GetProductData/ui/GetProductsData';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHNAMES } from 'shared/const/consts';
// import { Search } from '../../../../Components/Global/Search';
import { mainImg } from 'shared/const/images';
import { PhotoSlider } from 'widgets/PhotoSlider/ui/PhotoSlider';

export const MainTop = () => {
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const isSearch = screenWidth <= 1050;

   return (
      <section>
         <div className='container'>
            {/* {isSearch && <Search />} */}
            <div className='inner gap-[30px] min-h-[60vh] w-1400:flex-col w-1050:items-center w-1050:justify-center w-1050:flex-row w-930:flex-col w-930:gap-[50px] w-600:pt-[30px]'>
               <div>
                  <h1 className='text-7xl mb-[30px] w-1400:flex w-1400:gap-[20px] w-1050:block w-600:text-6xl w-420:text-5xl'>
                     <span className='block'>Просто.</span>
                     <span className='block'>Быстро.</span>
                     <span className='block'>Эффективно.</span>
                  </h1>
                  <GetProductsData />
                  <Link
                     className='btn mb-[10px] w-1400:mx-auto w-1050:mx-0'
                     to={PATHNAMES.photoDocument}
                  >
                     Фото на документы
                  </Link>
                  <Link
                     className='btn mb-[10px] w-1400:mx-auto w-1050:mx-0'
                     to={PATHNAMES.retouch}
                  >
                     Ретушь
                  </Link>
                  <Link
                     className='btn mb-[10px] w-1400:mx-auto w-1050:mx-0'
                     to={PATHNAMES.restoration}
                  >
                     Реставрация
                  </Link>
               </div>
               {isSearch && (
                  <div className='max-w-[500px] p-[30px] bg-invertedTextColor rounded-elementRounded rotate-[-3deg] translate-x-[-20px] w-930:translate-x-[0px] w-600:max-w-[350px]'>
                     <img
                        className='img'
                        src={mainImg}
                        alt='Фото на документ'
                     />
                  </div>
               )}
               {!isSearch && <PhotoSlider />}
            </div>
         </div>
      </section>
   );
};
