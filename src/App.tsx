import './App.css';
import PriceChart from './components/PriceChart';
import PriceDisplay from './components/PriceDisplay';
import { AppContextProvider } from './components/utils/context';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <PriceDisplay />
        <PriceChart />
      </AppContextProvider>
    </div>
  );
}
export default App;
