import SublimationMVP from './components/SublimationMVP';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <SublimationMVP />
    </AppProvider>
  );
}

export default App;
