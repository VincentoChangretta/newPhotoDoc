import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from 'shared/const/consts';

export type ServiceTypes = 'service_type_photo_document';

export const servicesApi = createApi({
   reducerPath: 'servicesApi',
   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
   endpoints: builder => ({
      getServicesByType: builder.query<any[], ServiceTypes>({
         query: serviceType => `photoDocApi.php?serviceType=${encodeURIComponent(serviceType)}`,
      }),
   }),
});

export const { useGetServicesByTypeQuery } = servicesApi;
