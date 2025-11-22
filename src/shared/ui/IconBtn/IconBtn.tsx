import './IconBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

interface IconBtnProps {
   pathname: string;
   icon: IconProp;
   onClick?: () => void;
   children?: ReactNode;
}

export const IconBtn = (props: IconBtnProps) => {
   const { icon, pathname, onClick } = props;
   return (
      <Link
         onClick={onClick}
         className='icon-btn'
         to={pathname}
      >
         <FontAwesomeIcon
            className='relative z-10'
            icon={icon}
         />
      </Link>
   );
};
