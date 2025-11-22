import { useGetServicesByTypeQuery } from '../model/api/servicesApi';

export const GetProductsData = () => {
   const { data, isLoading, error } = useGetServicesByTypeQuery('service_type_photo_document');

   console.log(data);

   return (
      <div>
         <button>API GET DATA</button>

         {isLoading && <p>Грузится...</p>}
         {error && <p>Ошибка</p>}
      </div>
   );
};
