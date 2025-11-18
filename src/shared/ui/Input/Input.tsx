import { InputHTMLAttributes } from 'react';

type InputPropsType = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder'>;

export interface InputProps extends InputPropsType {
   className?: string;
   inputStyles?: string;
   value?: string;
   placeholder?: string;
   truePlaceholder?: string; // статичный плейсхолдер (если нужен)
   placeholderStyles?: string;
   onChange?: (value: string) => void;
}

export const Input = (props: InputProps) => {
   const {
      className = 'max-w-[250px]',
      value,
      onChange,
      type = 'text',
      placeholder,
      truePlaceholder,
      placeholderStyles,
      inputStyles = 'text-lg',
      ...otherProps
   } = props;

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
   };

   return (
      <div className={className}>
         <label>
            {placeholder && <p className={placeholderStyles}>{placeholder}</p>}
            <input
               className={`corner p-3 w-full bg-mainBg-inv/20 backdrop-blur-[5px] text-lg ${inputStyles}`}
               type={type}
               value={value}
               onChange={onChangeHandler}
               placeholder={truePlaceholder || placeholder}
               {...otherProps}
            />
         </label>
      </div>
   );
};
