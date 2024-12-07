import './App.css';
import GenerateCrytoapi from './components/GenerateCryptoapi';
import GenerateQr from './components/GenrateQr';

function App() {
  return (
    <div className="App">
      <div>
        <GenerateQr />
      </div>
      <div>
        <GenerateCrytoapi />
      </div>
    </div>
  );
}

export default App;
