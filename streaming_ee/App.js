import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navegacion/AppNav';

function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}

export default App;