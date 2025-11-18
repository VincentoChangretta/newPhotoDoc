import { Portal } from 'shared/ui/Portal/Portal';
import './Loading.css';
import { TypingText } from 'shared/ui/TypingText/TypingText';
import { Title } from 'shared/ui/Title/Title';
import { AnimatedLogo } from '../AnimatedLogo/AnimatedLogo';

interface LoadingProps {
   portal?: boolean;
}

export const Loading = ({ portal = false }: LoadingProps) => {
   const content = (
      <div className='fixed z-[9999] inset-0 bg-mainBg-blue-darkest flex items-center justify-center'>
         <div className='loader'></div>
      </div>
   );

   if (portal) {
      return <Portal>{content}</Portal>;
   }

   return content;
};
