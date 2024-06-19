import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomNavBar from './components/BottomNavBar';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <BottomNavBar />
    </NavigationContainer>
  );
};

export default App;
