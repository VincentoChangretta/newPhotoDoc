import { Portal } from '../Portal/Portal';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
   children: ReactNode;
   className?: string;
   onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
   const { className, children, onClose } = props;

   const handleClose = () => {
      if (onClose) {
         onClose();
      }
   };

   return (
      // @ts-ignore
      <Portal element={document.querySelector('.app') || document.querySelector('body')}>
         <div
            className={`fixed z-[9000] inset-0 flex items-center justify-center backdrop-blur-[10px] bg-black/30 overflow-hidden ${className}`}
            onClick={handleClose}
         >
            <div
               onClick={e => e.stopPropagation()}
               className={`relative max-w-[600px] mx-5 w-full bg-mainBg-light min-h-[200px] rounded-[25px] ring-2 ring-white/10 overflow-hidden`}
            >
               <button
                  className={`flex justify-center items-center absolute z-50 right-[20px] top-[20px] w-10 h-10 rounded-full bg-main cursor-pointer transition duration-500 hover:rotate-180 max-500:w-7 max-500:h-7 max-500:top-[15px] max-500:right-[15px]`}
                  onClick={handleClose}
               >
                  <FontAwesomeIcon icon={faXmark} />
               </button>
               <div className='relative backdrop-blur-[20px] z-10 py-15 px-[30px] max-500:py-7 max-500:px-8'>
                  {children}
               </div>
            </div>
         </div>
      </Portal>
   );
};
