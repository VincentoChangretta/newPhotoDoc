import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface DropDownOptionsType<T> {
   // text: DELIVERY_TYPE | PRODUCT_LANGUAGES | string;
   text: T;
   link?: string;
}

export interface DropDownProps<T> {
   className?: string;
   activeOption: DropDownOptionsType<T>;
   setActiveOption: (option: DropDownOptionsType<T>) => void;
   textForActive?: string;
   options: DropDownOptionsType<T>[];
   activeOptionStyles?: string;
   listStyles?: string;
   itemStyles?: string;
}

export const DropDown = <T,>(props: DropDownProps<T>) => {
   const {
      className,
      options,
      activeOption,
      setActiveOption,
      activeOptionStyles,
      textForActive,
      listStyles,
      itemStyles,
   } = props;

   const dropDownRef = useRef<HTMLDivElement | null>(null);
   const measureRef = useRef<HTMLDivElement | null>(null);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [minWidth, setMinWidth] = useState<number>(0);

   const handleOpen = (option: DropDownOptionsType<T>) => {
      setIsOpen(prev => !prev);
      if (option) {
         setActiveOption(option);
      }
   };

   // закрытие при клике вне dropdown
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   // измерение самой длинной строки через скрытый span
   useEffect(() => {
      if (!measureRef.current) return;
      const children = Array.from(measureRef.current.children);
      const widths = children.map(el => (el as HTMLElement).getBoundingClientRect().width);
      const maxWidth = Math.max(...widths);
      setMinWidth(maxWidth); // запас под иконку + паддинги
   }, [options]);

   return (
      <div
         ref={dropDownRef}
         className={`relative z-50 cursor-pointer ${className}`}
         style={{ minWidth }}
      >
         {textForActive && <p>{textForActive}</p>}
         <div
            onClick={() => setIsOpen(prev => !prev)}
            className={`flex items-center justify-start gap-2.5 p-3 bg-mainBg-blue hover:bg-mainBg-blue-light transition duration-200 ${activeOptionStyles} ${
               isOpen && 'bg-mainPink border-mainPink'
            }`}
         >
            <p>{String(activeOption.text)}</p>
            <FontAwesomeIcon
               className={`transition duration-200 ${isOpen && 'rotate-180'} `}
               icon={faAngleDown}
            />
         </div>
         {isOpen && (
            <ul className={`absolute z-[1000] top-full right-0 left-0 transition duration-200 ${listStyles}`}>
               {options.map((option, index) => (
                  <li
                     className={`p-3 transition duration-200 ${itemStyles}`}
                     key={index}
                     onClick={() => handleOpen(option)}
                  >
                     {option.link ? (
                        <Link
                           to={option.link}
                           className='block'
                        >
                           {String(option.text)}
                        </Link>
                     ) : (
                        <span className='block'>{String(option.text)}</span>
                     )}
                  </li>
               ))}
            </ul>
         )}

         {/* скрытый блок для замеров */}
         <div
            ref={measureRef}
            className='absolute invisible whitespace-nowrap'
         >
            {options.map((opt, i) => (
               <span
                  key={i}
                  className='px-3 py-2 text-xl font-bold'
               >
                  {String(opt.text)}
               </span>
            ))}
         </div>
      </div>
   );
};
