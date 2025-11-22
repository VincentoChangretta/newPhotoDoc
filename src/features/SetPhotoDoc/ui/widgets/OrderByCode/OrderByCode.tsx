import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'shared/ui/Input/Input';
// import { changerOrderByCode } from '../../Redux/currentOrderByCode';
// import { useDispatch } from 'react-redux';
import { ModalCloser } from 'shared/ui/ModalCloser/ModalCloser';

interface OrderByCodeProps {
   setOrderByCode: (state: boolean) => void;
}

export const OrderByCode = (props: OrderByCodeProps) => {
   const { setOrderByCode } = props;
   const modalRef = useRef<HTMLDivElement>(null);
   const [codeValue, setCodeValue] = useState<string>('');
   //    const dispatch = useDispatch();
   useEffect(() => {
      const handleChange = (e: MouseEvent) => {
         if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setOrderByCode(false);
         }
      };
      document.addEventListener('click', handleChange);
      return () => document.removeEventListener('click', handleChange);
   }, []);

   const handleOrderByCode = () => {
      if (codeValue.length > 0) {
         //  dispatch(changerOrderByCode(codeValue));
         setOrderByCode(false);
      }
   };

   return (
      <div className='fixed z-[2000] inset-0 flex justify-center items-center backdrop-blur'>
         <div
            ref={modalRef}
            className='relative max-w-[600px] w-full p-[30px] rounded-elementRounded bg-textColor text-invertedTextColor text-center shadow-cardShadow w-560:pr-[60px]'
         >
            <ModalCloser closeModal={setOrderByCode} />
            <div className='flex flex-col items-center gap-[20px]'>
               <h3 className='text-2xl font-extrabold max-w-[400px] mx-auto'>
                  Чтобы заказать фотографии из архива, введите код фотографии
               </h3>
               <div className='max-w-[350px] w-full'>
                  <p className='text-xs mb-2'>(код фотографии состоит из даты и кодового слова)</p>
                  <Input
                     onChange={setCodeValue}
                     className='max-w-[350px] w-full'
                     placeholder='07.05.24 - Давид'
                  />
               </div>
               <button
                  className='btn inverted'
                  onClick={handleOrderByCode}
               >
                  Продолжить
               </button>
            </div>
         </div>
      </div>
   );
};
