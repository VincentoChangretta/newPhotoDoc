import { Link } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface LogoProps {
   className?: string;
}

export const Logo = (props: LogoProps) => {
   const { className } = props;
   return (
      <div className={className}>
         <Link
            className='text-4xl font-black'
            to={RoutePaths.MAIN}
         >
            PhotoDoc
            <span className='text-[15px] block leading-3'>Онлайн фотоцентр</span>
         </Link>
      </div>
   );
};
