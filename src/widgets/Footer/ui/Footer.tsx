import { Link } from 'react-router-dom';
import { Logo } from 'shared/components/Logo/Logo';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

export const Footer = () => {
   return (
      <footer className='py-[35px]'>
         <div className='container'>
            <div className='inner mb-[20px] w-1290:flex-wrap'>
               <Logo className='grow basis-0 w-600:text-center' />
               <ul className='flex gap-[30px] w-1050:hidden'>
                  <li>
                     <Link to={RoutePaths.MAIN}>Рекомендации</Link>
                  </li>
                  <li>
                     <Link to={RoutePaths.MAIN}>Доставка</Link>
                  </li>
                  <li>
                     <Link to={RoutePaths.MAIN}>Оферта</Link>
                  </li>
                  <li>
                     <Link to={RoutePaths.MAIN}>Поддержать проект</Link>
                  </li>
               </ul>
               <div className='grow basis-0 text-right w-600:hidden'>
                  <Link to={RoutePaths.MAIN}>Политика конфиденциальности</Link>
               </div>
            </div>
            <div className='text-center'>
               <a
                  className='py-[10px] px-[25px] rounded-elementRounded text-xl font-extrabold bg-textColor text-invertedTextColor'
                  target='_blank'
                  href='https://vcdevs.com/'
               >
                  Сайт от vcDevs
               </a>
            </div>
         </div>
      </footer>
   );
};
