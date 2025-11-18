import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ServiceDataType } from 'entities/basket';
import { memo, useState } from 'react';

interface PriceBox extends Partial<ServiceDataType> {
   tooltipText?: string;
   className?: string;
   size?: string;
   activePrice?: number;
   activeCurrency?: string;
}

export const PriceBox = memo((props: PriceBox) => {
   const {
      activePrice,
      activeCurrency,
      price,
      currency,
      price_otherCountries,
      currency_otherCountries,
      price_europe,
      currency_europe,
      tooltipText,
      className = '',
      size = 'text-5xl ',
   } = props;
   const [showTooltip, setShowTooltip] = useState<boolean>(false);

   if (!price || !currency || !price_otherCountries || !currency_otherCountries) {
      return null;
   }

   return (
      <div className={`relative ${className}`}>
         {tooltipText && showTooltip && (
            <span className='absolute z-50 p-2 left-0 top-[-55px] bg-mainBg-blue text-mainBg-inv font-bold'>
               {tooltipText}
            </span>
         )}

         {activePrice && activeCurrency ? (
            <div className={`relative w-fit font-Bebas ${size}`}>{activePrice + ' ' + activeCurrency}</div>
         ) : (
            <div className={`relative w-fit font-Bebas ${size}`}>
               {price + ' ' + currency} /{' '}
               <span className='inline-block relative'>
                  {price_otherCountries + ' ' + currency_otherCountries}
               </span>{' '}
               / <span className='inline-block relative'>{price_europe + ' ' + currency_europe}</span>
               {tooltipText && (
                  <span
                     onMouseOver={() => setShowTooltip(true)}
                     onMouseLeave={() => setShowTooltip(false)}
                     className='absolute top-[-7px] right-[-18px] w-4 h-4 flex justify-center items-center aspect-square rounded-full border-1 border-mainBg-inv hover:bg-mainBg-inv hover:text-mainBg-blue-superDarkest'
                  >
                     <FontAwesomeIcon
                        className='text-[8px]'
                        icon={faInfo}
                     />
                  </span>
               )}
            </div>
         )}
      </div>
   );
});
