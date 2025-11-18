import { ReactNode, useState } from 'react';

interface TooltipProps {
   text: string;
   children: ReactNode;
   position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
   const [visible, setVisible] = useState(false);

   const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
      left: 'right-full top-1/2 -translate-y-1/2 mr-1',
      right: 'left-full top-1/2 -translate-y-1/2 ml-1',
   };

   return (
      <div className='w-full' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
         {children}
         {visible && (
            <div
               className={`absolute w-full  z-50 bg-mainBg-inv/90 text-mainBg-blue-superDarkest text-sm px-3 py-1 rounded-md shadow-lg font-Montserrat ${positionClasses[position]}`}
            >
               {text}
            </div>
         )}
      </div>
   );
};
