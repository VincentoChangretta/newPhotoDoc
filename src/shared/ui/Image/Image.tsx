import React from 'react';

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
   /** Путь к основному изображению */
   src: string;
   /** Alt-текст для основного изображения */
   alt: string;
   /** Доп. классы для контейнера */
   imgBoxClassName?: string;
   /** Доп. классы для основного <img> */
   imgClassName?: string;
   /** Опциональное вложенное изображение (например, иконка поверх) */
   childrenImg?: string;
   /** Alt-текст для вложенного изображения */
   childrenAlt?: string;
   /** Доп. классы для вложенного <img> */
   childrenImgClassName?: string;
   /** Пропсы для основного <img> */
   imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export const Image: React.FC<ImageProps> = ({
   src,
   alt,
   imgBoxClassName = 'max-w-[300px]',
   imgClassName,
   childrenImg,
   childrenAlt,
   childrenImgClassName,
   imgProps,
   ...rest // теперь это пойдет на <div>
}) => {
   return (
      <div className={imgBoxClassName} {...rest}>
         <img className={`flex w-full h-full object-cover ${imgClassName ?? ''}`} src={src} alt={alt} {...imgProps} />
         {childrenImg && <img className={childrenImgClassName} src={childrenImg} alt={childrenAlt ?? ''} />}
      </div>
   );
};
