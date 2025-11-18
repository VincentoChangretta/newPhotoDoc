import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from 'shared/components/Logo/Logo.js';
import { HeaderNavigationArr } from 'shared/config/navigationConfig/navigationConfig.js';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { useWindowSize } from 'shared/hooks/useWindowSize/useWindowSize';

export const Header = () => {
   const screenWidth = useWindowSize();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);
   const isBurger = screenWidth < 1050;

   const commonLinks = [
      ...HeaderNavigationArr.map(nav => ({
         to: nav.pathname,
         label: nav.label,
      })),
      { to: RoutePaths.RECOMMENDATIONS, label: 'Рекомендации' },
      { to: RoutePaths.DELIVERY, label: 'Доставка' },
      { to: RoutePaths.MAIN, label: 'Поддержать проект' },
   ];

   return (
      <header>
         <div className='container'>
            <div className='inner py-[35px] w-1400:flex-wrap w-1400:gap-x-[50px] w-1050:justify-between w-1050:gap-[20px]'>
               {/* Десктопная версия */}
               {!isBurger ? (
                  <>
                     <Logo />
                     <div className='w-full flex justify-end items-center gap-[75px] w-1400:justify-between'>
                        <ul className='flex gap-[30px] select-none'>
                           {HeaderNavigationArr.map(link => (
                              <li key={link.id}>
                                 <Link to={link.pathname}>{link.label}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </>
               ) : (
                  /* Мобильная версия */
                  <>
                     <Logo />
                     <button
                        className='text-4xl cursor-pointer'
                        onClick={() => setIsMenuOpen(prev => !prev)}
                     >
                        <FontAwesomeIcon icon={faBars} />
                     </button>

                     <div
                        ref={menuRef}
                        className={`fixed top-0 right-0 bottom-0 z-[1000] flex flex-col justify-center items-center w-[350px] w-460:w-full bg-textColor text-invertedTextColor text-center transition-transform duration-300 ${
                           isMenuOpen ? 'translate-x-0' : 'translate-x-[350px] w-460:translate-x-[100%]'
                        }`}
                     >
                        <button
                           className='absolute top-[45px] right-[10px] text-4xl cursor-pointer'
                           onClick={() => setIsMenuOpen(false)}
                        >
                           <FontAwesomeIcon icon={faCircleXmark} />
                        </button>

                        <ul className='flex flex-col gap-[25px] text-xl'>
                           {commonLinks.map(link => (
                              <li key={link.to}>
                                 <Link
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                 >
                                    {link.label}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </>
               )}
            </div>
         </div>
      </header>
   );
};
