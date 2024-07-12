import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BrevityNavigation from './components/BrevityNavigation';
import {RecoilRoot} from 'recoil';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const App = () => {
  const API_KEY = Config.GOOGLE_KEY;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: API_KEY,
      offlineAccess: true,
    });
  }, []);

  return (
    <RecoilRoot>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NavigationContainer>
        <BrevityNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
