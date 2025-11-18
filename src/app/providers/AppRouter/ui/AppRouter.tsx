import { Suspense } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Loading } from 'shared/components/Loading/Loading';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
   return (
      <>
         <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
               <Route
                  key={path}
                  path={path}
                  element={<Suspense fallback={<Loading />}>{element}</Suspense>}
               ></Route>
            ))}
         </Routes>
      </>
   );
};
