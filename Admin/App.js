import React from 'react';
import Navigation from './Navigation/Index'
import ContextProvider from './Context/Context'
export default function App() {
  return (
    <ContextProvider>  
      <Navigation/>
    </ContextProvider>

  );
}