import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ButtonThemes } from './types/types';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ButtonSize = 'default' | 'smallest';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   children: ReactNode;
   theme?: ButtonThemes;
   link?: boolean;
   a?: boolean;
   to?: string;
   primaryFullSize?: string;
   icon?: IconDefinition;
   size?: ButtonSize;
}

export const Button = (props: ButtonProps) => {
   const {
      className = '',
      children,
      theme = ButtonThemes.STANDART,
      link,
      a,
      to,
      icon,
      size = 'default',
      ...other
   } = props;

   const isSmallest = size === 'smallest';
   const clipPath = 'polygon(0 0, 100% 0, 100% 68%, 92% 100%, 0 100%)';

   const baseClasses = isSmallest
      ? 'primaryBtn max-w-[140px] p-1 px-4 bg-mainBg-blue w-fit hover:bg-mainBg-blue-darkest cursor-pointer hover:text-mainBg-inv flex items-center gap-1 text-sm font-semibold duration-300'
      : `primaryBtn max-w-[250px] flex justify-center items-center gap-2 w-full font-bold transition-all  text-2xl cursor-pointer transition-colors duration-300 ${theme} ${
           !link && !a && 'p-4'
        }`;

   return (
      <button
         style={{
            clipPath,
         }}
         className={`${baseClasses} ${className}`}
         {...other}
      >
         {icon && <FontAwesomeIcon icon={icon} />}
         {link && to ? (
            <Link
               to={to}
               className={isSmallest ? '' : 'w-full p-4'}
            >
               {children}
            </Link>
         ) : a && to ? (
            <a
               href={to}
               className={isSmallest ? '' : 'w-full p-4'}
            >
               {children}
            </a>
         ) : (
            children
         )}
      </button>
   );
};
