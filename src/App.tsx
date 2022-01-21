import './App.css';
import PriceDisplay from './components/PriceDisplay';
import { AppContextProvider } from './components/utils/context';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <PriceDisplay />
      </AppContextProvider>
    </div>
  );
}

export default App;
