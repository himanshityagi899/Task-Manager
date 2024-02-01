import { useContext } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';

import { UserContextProvider } from './contexts/UserContextProvider';
import { UserContext } from './contexts/UserContextProvider';


function App() {

  const {isLogedIn}=useContext(UserContext);

  return (
    <UserContextProvider>
      <div className="App">
        
        {isLogedIn ? <h1> LoggedIn</h1>:<LandingPage/>}
      </div>
    </UserContextProvider>
  );
}

export default App;
