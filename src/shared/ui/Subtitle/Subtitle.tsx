import { ReactNode } from 'react';

interface SubtitleProps {
   children: ReactNode;
   className?: string;
}

export const Subtitle = (props: SubtitleProps) => {
   const { children, className } = props;
   return <p className={`text-2xl text-balance ${className}`}>{children}</p>;
};
