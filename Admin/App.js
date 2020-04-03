import React from 'react';
import Navigation from './Navigation/Drawer'
import ContextProvider from './Context/Context'
export default function App() {
  return (
    <ContextProvider>  
      <Navigation/>
    </ContextProvider>

  );
}