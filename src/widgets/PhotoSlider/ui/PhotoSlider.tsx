import React, { useEffect, useState } from 'react';
import './PhotoSlider.css';
import { PHOTODOC_PRICE_ONLINE, RESTORATION_PRICE, RETOUCH_PRICE } from 'shared/const/consts';
import { docImg, restImg, retImg } from 'shared/const/images';

const mainTopImgArr = [
   {
      id: 'фото на документы',
      img: docImg,
      text: 'Фото на документы',
      price: PHOTODOC_PRICE_ONLINE,
   },
   {
      id: 'обработка фотографий',
      img: retImg,
      text: 'Ретушь',
      price: RETOUCH_PRICE,
   },
   {
      id: 'реставрация фотографий',
      img: restImg,
      text: 'Реставрация',
      price: RESTORATION_PRICE,
   },
];

export const PhotoSlider = () => {
   const [coverEl, setCoverEl] = useState<boolean | null>(null);
   const [activeEl, setActiveEl] = useState<string>('img-box-1');
   const [fistChildIndex, setFirstChildIndex] = useState<number>(0);
   const classesToCheck: string[] = ['img-box-2', 'img-box-3'];

   useEffect(() => {
      let cur = 0;
      const imgArray = ['img-box-1', ...classesToCheck];
      const imgTimeout = setInterval(() => {
         if (cur === imgArray.length) {
            cur = 0;
         }
         setActiveEl(imgArray[cur]);
         setCoverEl(true);

         cur++;
      }, 10000);
      return () => clearTimeout(imgTimeout);
   }, []);

   useEffect(() => {
      const cards = document.querySelectorAll('.img-box');

      const handleHover = (event: MouseEvent, index: number) => {
         const target = event.currentTarget as HTMLDivElement;

         if (classesToCheck.some(cls => target.classList.contains(cls))) {
            setCoverEl(true);
         }

         if (fistChildIndex !== index) {
            setFirstChildIndex(0);
         }

         const activeElClass = Array.from(target.classList)
            .filter(c => c.startsWith('img-box-'))
            .filter(c => !c.includes('cover'));

         setActiveEl(activeElClass[0] ?? '');
      };

      const handlers: Array<[(e: Event) => void, Element]> = [];

      cards.forEach((item, index) => {
         const fn = (e: Event) => handleHover(e as MouseEvent, index);
         handlers.push([fn, item]);
         item.addEventListener('mouseenter', fn);
      });

      return () => {
         handlers.forEach(([fn, item]) => {
            item.removeEventListener('mouseenter', fn);
         });
      };
   }, []);

   return (
      <div className='flex justify-end gap-[30px] max-w-[1100px] w-full card-container w-1630:max-w-[1000px]'>
         {mainTopImgArr.map((imgObject, index) => {
            const baseClass = 'img-box';
            const indexClass = `img-box-${index + 1}`;
            const coverClass = index === 0 && coverEl ? 'img-box-1-cover' : '';
            const activeImg = indexClass === activeEl ? 'active-img' : '';
            const className = `${baseClass} ${indexClass} ${coverClass} ${activeImg}`;
            return (
               <div
                  key={imgObject.id}
                  className={className}
                  style={{ backgroundImage: `url(${imgObject.img})` }}
               >
                  <div className='img-box__price'>
                     <div>
                        <h3>{imgObject.text}</h3>
                        <p className='rounded-l-[30px]'>
                           от <span className='font-bold'>{imgObject.price}</span> рублей
                        </p>
                     </div>
                  </div>
                  <div className='img-box__block '>
                     <p className='img-box__block-text rounded-r-[30px]'>{imgObject.text}</p>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
