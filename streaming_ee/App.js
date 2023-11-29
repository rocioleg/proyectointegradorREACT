import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navegacion/AppNav';
import * as ScreenOrientation from 'expo-screen-orientation';

function App() {
  
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}

export default App;