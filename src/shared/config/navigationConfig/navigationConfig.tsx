import { RoutePaths } from '../routeConfig/routeConfig';

interface NavigationType {
   id: string;
   label: string;
   pathname: string;
}

export const HeaderNavigationArr: NavigationType[] = [
   {
      id: 'glavnaya',
      label: 'Главная',
      pathname: RoutePaths.MAIN,
   },
   {
      id: 'fotodocument',
      label: 'Фото на документы',
      pathname: RoutePaths.PHOTO_DOCUMENT,
   },
   {
      id: 'restoration',
      label: 'Реставрация',
      pathname: RoutePaths.RESTORATION,
   },
   {
      id: 'retouch',
      label: 'Ретушь',
      pathname: RoutePaths.RETOUCH,
   },
   {
      id: 'aboutus',
      label: 'О нас',
      pathname: RoutePaths.ABOUT_US,
   },
];
