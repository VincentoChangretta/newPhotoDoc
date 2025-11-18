import { Contacts } from 'widgets/Contacts';
import { FAQ } from 'widgets/FAQ';
import { MainInfo } from 'widgets/MainPageSections/MainInfo';
import { MainServices } from 'widgets/MainPageSections/MainServices/MainServices';
import { MainSteps } from 'widgets/MainPageSections/MainSteps';
import { MainTop } from 'widgets/MainPageSections/MainTop';

const MainPage = () => {
   return (
      <>
         <MainTop />
         <MainInfo />
         <MainSteps />
         <FAQ />
         <MainServices />
         <Contacts />
      </>
   );
};

export default MainPage;
