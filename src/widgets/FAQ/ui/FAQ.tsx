import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faqData } from 'shared/const/consts';

export const FAQ = () => {
   const [activeQuestions, setActiveQuestions] = useState<string[]>([]);

   const toggleQuestion = (id: string) => {
      setActiveQuestions(prev =>
         prev.includes(id) ? prev.filter(questionId => questionId !== id) : [...prev, id],
      );
   };

   return (
      <section>
         <div className='container'>
            <div className='title-box text-center'>
               <h2>Вопросы & Ответы</h2>
            </div>
            <div className='max-w-[1200px] mx-auto'>
               {faqData.map(item => (
                  <div
                     key={item.id}
                     className='mb-[3px] overflow-hidden border-t border-textColor last-of-type:mb-0'
                  >
                     <div
                        className='flex justify-between items-center cursor-pointer py-[16px] w-700:py-[8px]'
                        onClick={() => toggleQuestion(item.id)}
                     >
                        <p className='pr-[50px] text-3xl font-extrabold w-1050:text-2xl w-820:text-xl w-700:text-xl'>
                           {item.question}
                        </p>
                        <button
                           className='text-3xl font-extrabold transition-all'
                           style={{
                              rotate: !activeQuestions.includes(item.id) ? '45deg' : '0deg',
                           }}
                        >
                           <FontAwesomeIcon icon={faXmark} />
                        </button>
                     </div>
                     <div
                        className='transition-all duration-300 pr-[30px] overflow-hidden'
                        style={{
                           maxHeight: activeQuestions.includes(item.id) ? '250px' : '0px',
                           paddingBottom: activeQuestions.includes(item.id) ? '16px' : '0',
                        }}
                     >
                        <p className='text-xl w-820:text-base w-700:text-base'>{item.answer}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
