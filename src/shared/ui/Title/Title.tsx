import { HTMLAttributes, ReactNode } from 'react';

export type TitleSize = 'main' | 'big' | 'middle' | 'small' | 'smallest';
export type TitleFont = 'font-Bebas' | 'font-Montserrat font-bold';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
   children: ReactNode;
   size?: TitleSize | null;
   font?: TitleFont;
}

export const Title = (props: TitleProps) => {
   const { children, size = null, className = '', font = 'font-Bebas', ...rest } = props;
   if (size === 'main') {
      return (
         <h2
            className={`text-[85px] leading-[85px] text-center tracking-[1px] mb-[30px] text-pretty max-1000:text-[55px] max-1000:leading-[55px] max-600:text-[35px] max-600:leading-[35px] max-400:text-[28px] max-400:leading-[28px] ${className} ${font}`}
            {...rest}
         >
            {children}
         </h2>
      );
   }

   if (size === 'big') {
      return (
         <h2
            className={`text-5xl leading-[48px] text-center tracking-[1px] mb-[30px] text-pretty ${className} ${font}`}
            {...rest}
         >
            {children}
         </h2>
      );
   }

   if (size === 'middle') {
      return (
         <h2
            className={`text-4xl leading-[36px] text-balance tracking-[1px] mb-[25px] text-pretty max-1500:text-3xl max-1500:leading-[30px] ${className}  ${font}`}
            {...rest}
         >
            {children}
         </h2>
      );
   }

   if (size === 'small') {
      return (
         <h3
            className={`text-3xl leading-[30px] text-balance tracking-[1px] mb-[25px] text-pretty max-1100:text-xl max-1100:leading-[20px] max-650:text-base max-650:leading-[16px] max-470:text-sm max-470:leading-[14px] ${className} ${font}`}
            {...rest}
         >
            {children}
         </h3>
      );
   }

   if (size === 'smallest') {
      return (
         <h3
            className={`text-xl leading-[20px] text-balance tracking-[1px] mb-[25px] text-pretty ${className} ${font}`}
            {...rest}
         >
            {children}
         </h3>
      );
   }

   return (
      <h2
         className={`text-6xl leading-[60px] text-center mb-[50px] max-1500:text-4xl max-1500:leading-[36px] max-1500:mb-[25px] text-pretty ${className} ${font}`}
         {...rest}
      >
         {children}
      </h2>
   );
};
