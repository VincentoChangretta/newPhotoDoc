import React, { MouseEvent, useRef, useState } from 'react';
import { Input, InputProps } from '../Input/Input';
import { IconType } from 'react-icons';
import { useClickOutside } from 'shared/hooks/useClickOutside/useClickOutside';

export interface ChoiceOption {
   name: string;
   placeholder: string;
   icon?: IconType;
   label?: string;
}

export interface InputWithChoiceProps extends InputProps {
   options: ChoiceOption[];
   defaultIndex?: number;
   onChangeOption?: (option: ChoiceOption) => void;
   inputStyles?: string;
}

export const InputWithChoice = (props: InputWithChoiceProps) => {
   const { options, defaultIndex = 0, onChangeOption, inputStyles = 'text-lg', ...inputProps } = props;
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState<ChoiceOption>(options[defaultIndex]);
   const wrapperRef = useRef<HTMLDivElement | null>(null);
   useClickOutside(wrapperRef, () => setOpen(false));

   const handleSetOption = (e: MouseEvent<HTMLElement>, option: ChoiceOption) => {
      e.stopPropagation();
      setOpen(false);
      setSelected(option);
      onChangeOption?.(option);
   };

   return (
      <div className='relative' ref={wrapperRef}>
         <div
            className='absolute z-10 w-[120px] h-[70%] rounded-2xl left-2 top-2/4 -translate-y-2/4 bg-mainBg/50 cursor-pointer flex items-center justify-center gap-2'
            onClick={() => setOpen(prev => !prev)}
         >
            {selected.icon && <selected.icon className='text-3xl' />}
            {open && (
               <ul className='absolute z-20 top-full left-0 right-0 w-full bg-mainBg-light rounded-xl border border-white/10 overflow-hidden'>
                  {options.map(option => (
                     <li
                        key={option.name}
                        className='py-2 px-2 flex items-center justify-center gap-2 hover:bg-mainBg/50 cursor-pointer'
                        onClick={e => handleSetOption(e, option)}
                     >
                        {option.icon && <option.icon className='text-3xl' />}
                     </li>
                  ))}
               </ul>
            )}
         </div>
         <Input inputStyles={`pl-[140px] ${inputStyles}`} truePlaceholder={selected.placeholder} {...inputProps} />
      </div>
   );
};
