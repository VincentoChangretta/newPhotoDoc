import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

type TextareaPropsType = Omit<
   TextareaHTMLAttributes<HTMLTextAreaElement>,
   'value' | 'onChange' | 'placeholder'
>;

export interface TextareaProps extends TextareaPropsType {
   className?: string;
   inputStyles?: string;
   value?: string;
   placeholder?: string;
   truePlaceholder?: string; // статичный плейсхолдер
   placeholderStyles?: string;
   animatePlaceholder?: string[]; // ⚡ массив строк для анимации
   onChange?: (value: string) => void;
}

export const Textarea = (props: TextareaProps) => {
   const {
      className = 'max-w-[250px]',
      value,
      onChange,
      placeholder,
      truePlaceholder,
      placeholderStyles = '',
      inputStyles = '',
      animatePlaceholder,
      ...otherProps
   } = props;

   const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
   };

   return (
      <div className={` ${className}`}>
         {placeholder && <p className={placeholderStyles}>{placeholder}</p>}
         <div className={`corner px-3 py-3 w-full bg-mainBg-inv/20 backdrop-blur-[5px] `}>
            <label>
               <textarea
                  className={`text-lg w-full ${inputStyles}`}
                  value={value}
                  onChange={onChangeHandler}
                  placeholder={truePlaceholder}
                  {...otherProps}
               />
            </label>
         </div>
      </div>
   );
};
