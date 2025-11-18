import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { PhotoDocumentPage } from 'pages/PhotoDocumentPage'; // Assuming this is needed
import { RestorationPage } from 'pages/RestorationPage'; // Assuming this is needed
import { RetouchPage } from 'pages/RetouchPage'; // Assuming this is needed
import { AboutUsPage } from 'pages/AboutUsPage'; // Assuming this is needed
import { ConstructorPage } from 'pages/ConstructorPage'; // New Import
import { DeliveryPage } from 'pages/DeliveryPage'; // New Import
import { OrderPage } from 'pages/OrderPage'; // New Import
import { RecommendationsPage } from 'pages/RecommendationsPage'; // New Import
import { SupportProjectPage } from 'pages/SupportProjectPage';

// Перечисляем все маршруты
export enum AppRoutes {
   MAIN = 'MAIN',
   PHOTO_DOCUMENT = 'PHOTO_DOCUMENT',
   RESTORATION = 'RESTORATION',
   RETOUCH = 'RETOUCH',
   ABOUT_US = 'ABOUT_US',
   CONSTRUCTOR = 'CONSTRUCTOR', // New Route
   DELIVERY = 'DELIVERY', // New Route
   ORDER = 'ORDER', // New Route
   RECOMMENDATIONS = 'RECOMMENDATIONS', // New Route
   SUPPORT_PROJECT = 'SUPPORT_PROJECT', // New Route
   NOT_FOUND = 'NOT_FOUND', // Н
}

// Пути
export const RoutePaths: Record<AppRoutes, string> = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.PHOTO_DOCUMENT]: '/photo-document',
   [AppRoutes.RESTORATION]: '/restoration',
   [AppRoutes.RETOUCH]: '/retouch',
   [AppRoutes.ABOUT_US]: '/about-us',
   [AppRoutes.CONSTRUCTOR]: '/constructor', // New Path
   [AppRoutes.DELIVERY]: '/delivery', // New Path
   [AppRoutes.ORDER]: '/order', // New Path
   [AppRoutes.RECOMMENDATIONS]: '/recommendations', // New Path
   [AppRoutes.SUPPORT_PROJECT]: '/support-project', // New Path
   [AppRoutes.NOT_FOUND]: '*', // New Path
};

// Конфигурация маршрутов
export const routeConfig: Record<AppRoutes, RouteProps> = {
   [AppRoutes.MAIN]: {
      path: RoutePaths.MAIN,
      element: <MainPage />,
   },
   [AppRoutes.PHOTO_DOCUMENT]: {
      path: RoutePaths.PHOTO_DOCUMENT,
      element: <PhotoDocumentPage />, // Using PhotoDocumentPage
   },
   [AppRoutes.RESTORATION]: {
      path: RoutePaths.RESTORATION,
      element: <RestorationPage />, // Using RestorationPage
   },
   [AppRoutes.RETOUCH]: {
      path: RoutePaths.RETOUCH,
      element: <RetouchPage />, // Using RetouchPage
   },
   [AppRoutes.ABOUT_US]: {
      path: RoutePaths.ABOUT_US,
      element: <AboutUsPage />, // Using AboutUsPage
   },
   [AppRoutes.CONSTRUCTOR]: {
      // New Route
      path: RoutePaths.CONSTRUCTOR,
      element: <ConstructorPage />,
   },
   [AppRoutes.DELIVERY]: {
      // New Route
      path: RoutePaths.DELIVERY,
      element: <DeliveryPage />,
   },
   [AppRoutes.ORDER]: {
      // New Route
      path: RoutePaths.ORDER,
      element: <OrderPage />,
   },
   [AppRoutes.SUPPORT_PROJECT]: {
      // New Route
      path: RoutePaths.SUPPORT_PROJECT,
      element: <SupportProjectPage />,
   },
   [AppRoutes.RECOMMENDATIONS]: {
      // New Route
      path: RoutePaths.RECOMMENDATIONS,
      element: <RecommendationsPage />,
   },
   [AppRoutes.NOT_FOUND]: {
      // New Route
      path: RoutePaths.NOT_FOUND,
      element: <MainPage />,
   },
};
