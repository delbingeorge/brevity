import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BrevityNavigation from './components/BrevityNavigation';
import {RecoilRoot} from 'recoil';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_API} from '@env';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: `${GOOGLE_API}`,
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
