import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomNavBar from './components/BottomNavBar';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <BottomNavBar />
    </NavigationContainer>
  );
};

export default App;
