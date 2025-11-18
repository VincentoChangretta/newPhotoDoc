import { Header } from 'widgets/Header';
import './styles/App.css';
import { AppRouter } from './providers/AppRouter';
import { Footer } from 'widgets/Footer';

function App() {
   return (
      <div className='wrapper'>
         <Header />
         <main className='main'>
            <AppRouter />
         </main>
         <Footer />
      </div>
   );
}

export default App;
