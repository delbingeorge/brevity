import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BrevityNavigation from './components/BrevityNavigation';
import {RecoilRoot} from 'recoil';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '531508705755-pnoc43u22q280straf9u822d028pd9n9.apps.googleusercontent.com',
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
