import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import BrevityNavigation from './components/BrevityNavigation';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <BrevityNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
