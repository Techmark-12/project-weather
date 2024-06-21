import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Weather from './components/Weather';

function App() {
  const [num, setNum] = useState(1);
  const [userName, setUserName] = useState('First Name');

  return (
    <div className="App">
       <Weather />
    </div>
  );
}

export default App;
