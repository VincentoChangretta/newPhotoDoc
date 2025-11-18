import { faCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputHTMLAttributes, useRef, useState } from 'react';

type InputFilePropsType = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'type' | 'value' | 'onChange' | 'placeholder'
>;

export interface InputFileProps extends InputFilePropsType {
   className?: string;
   inputStyles?: string;
   placeholder?: string;
   placeholderStyles?: string;
   buttonLabel?: string; // текст на кнопке (например "Загрузить файл")
   onChange?: (file: File | null) => void;
}

export const InputFile = (props: InputFileProps) => {
   const {
      className,
      placeholder,
      placeholderStyles,
      inputStyles = 'text-lg',
      buttonLabel = 'Выбрать файл',
      onChange,
      ...otherProps
   } = props;

   const inputRef = useRef<HTMLInputElement | null>(null);
   const [fileLoaded, setFileLoaded] = useState(false);

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFileLoaded(!!file);
      onChange?.(file);
   };

   return (
      <div className={`select-none `}>
         {placeholder && <p className={placeholderStyles}>{placeholder}</p>}
         <div
            className={`corner p-3 w-full backdrop-blur-[5px] flex items-center justify-center gap-1 cursor-pointer ${inputStyles} ${
               fileLoaded ? 'bg-mainBg-blue text-mainBg-inv' : 'bg-mainBg-inv/20 text-mainBg-inv/60'
            } ${className}`}
            onClick={handleClick}
         >
            <FontAwesomeIcon icon={fileLoaded ? faCheck : faDownload} />
            <span className={`truncate text-lg font-bold text-center  `}>
               {fileLoaded ? 'Файл загружен' : 'Загрузить'}
            </span>
         </div>

         <input
            ref={inputRef}
            type='file'
            accept='image/*,.pdf'
            className='hidden'
            onChange={handleChange}
            {...otherProps}
         />
      </div>
   );
};
