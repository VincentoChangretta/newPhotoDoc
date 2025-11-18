import { Dispatch, SetStateAction } from 'react';

interface CounterProps {
   value: number;
   setValue: (val: number) => void;
   btnStyles?: string;
}

export const Counter = (props: CounterProps) => {
   const { value, setValue, btnStyles } = props;
   const btnAdditionalStyles = `w-12 aspect-square shrink-0 text-4xl font-bold text-mainBg-inv bg-mainBg-blue cursor-pointer duration-200 hover:bg-mainBg-inv hover:text-mainBg-blue ${btnStyles}`;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
      setValue(val === '' ? 1 : Number(val));
   };

   const handleIncrement = () => setValue(value + 1);
   const handleDecrement = () => setValue(value > 1 ? value - 1 : 1);

   return (
      <div className='flex max-w-[200px]'>
         <button
            className={btnAdditionalStyles}
            onClick={handleIncrement}
         >
            +
         </button>
         <input
            className='max-w-[100px] bg-mainBg-inv/5 font-bold text-xl text-center outline-transparent'
            type='text'
            inputMode='numeric'
            value={value}
            onChange={handleChange}
         />
         <button
            className={btnAdditionalStyles}
            onClick={handleDecrement}
         >
            –
         </button>
      </div>
   );
};
