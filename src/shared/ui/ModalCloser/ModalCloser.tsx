import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalCloserProps {
   closeModal: (prev: boolean) => void;
}

export const ModalCloser = (props: ModalCloserProps) => {
   const { closeModal } = props;
   return (
      <button
         onClick={() => closeModal(false)}
         className='absolute right-[20px] top-[20px] flex justify-center items-center w-[30px] h-[30px] bg-textColorHover text-invertedTextColor font-black text-xl rounded-[50%] transition-all hover:rotate-45'
      >
         <FontAwesomeIcon icon={faXmark} />
      </button>
   );
};
