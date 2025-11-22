import { photoDocumentArr } from 'shared/const/consts';
import { PhotoDocumentCard } from './widgets/PhotoDocumentCard/PhotoDocumentCard';
import { MainInfoPhoto } from 'widgets/MainPageSections/MainInfo/ui/MainInfoPhoto';
import { CreateCustomSize } from './widgets/CreateCustomSize/CreateCustomSize';
import { useState } from 'react';
// import { useScrollToTop } from '../../../Hooks/useScrollToTop';
// import { useDispatch, useSelector } from 'react-redux';
import { OrderByCode } from './widgets/OrderByCode/OrderByCode';

export const SetPhotoDoc = () => {
   // const dispatch = useDispatch();
   const [createCustomSizeModal, setCreateCustomSizeModal] = useState<boolean>(false);
   const [orderByCode, setOrderByCode] = useState<boolean>(false);
   // const orderByCodeState = useSelector(state => state.currentOrderByCode.code);
   // useScrollToTop();
   const handleDeleteCode = () => {
      // dispatch(deleteOrderByCode());
      // dispatch(delClientPhotoCode());
   };

   const orderByCodeState = true;
   return (
      <>
         <section className='photodocument'>
            <div className='container'>
               <div className='title-box text-center'>
                  <h2>Выберите подходящий размер</h2>
               </div>
               <div className='flex justify-between items-center w-1160:flex-col w-1160:gap-[60px]'>
                  <div className='flex flex-col gap-[10px] w-1160:items-center'>
                     {photoDocumentArr.map(photo => (
                        <PhotoDocumentCard
                           key={photo.id}
                           photo={photo}
                        />
                     ))}
                     {!orderByCodeState ? (
                        <>
                           <button
                              className='btn'
                              onClick={e => (e.stopPropagation(), setCreateCustomSizeModal(true))}
                           >
                              Создать свой размер
                           </button>
                           <button
                              className='btn'
                              onClick={e => (e.stopPropagation(), setOrderByCode(true))}
                           >
                              Заказать из архива
                           </button>
                        </>
                     ) : (
                        <button
                           className='btn'
                           onClick={handleDeleteCode}
                        >
                           Печать новых фотографий
                        </button>
                     )}
                  </div>
                  <MainInfoPhoto photoDocPage={true} />
               </div>
            </div>
         </section>
         {createCustomSizeModal && <CreateCustomSize setCreateCustomSizeModal={setCreateCustomSizeModal} />}
         {orderByCode && <OrderByCode setOrderByCode={setOrderByCode} />}
      </>
   );
};
