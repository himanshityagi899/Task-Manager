import { useContext,useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';

import { UserContextProvider } from './contexts/UserContextProvider';
import { UserContext } from './contexts/UserContextProvider';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const {isLogedIn}=useContext(UserContext);

  return (
    <>
        <Toaster
        position='top-right'
          toastOptions={{
            success:{
              theme:{
                primary: '#4aed88'
              }
            }
          }}></Toaster>
        

      <UserContextProvider>
         
          <WrapperComp/>
        
      </UserContextProvider>
    </>
    
  );
}

const WrapperComp =()=>{
  const {isLogedIn}=useContext(UserContext);
  return(
    <div className="App">
      {isLogedIn ? <Dashboard/>:<LandingPage/>}
    </div>
  )
}

export default App;
