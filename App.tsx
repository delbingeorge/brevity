import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomNavBar from './components/BottomNavBar';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const authValue = true;
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <BottomNavBar />
      {!authValue ? (
        <Modal transparent={true}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              height: Dimensions.get('screen').height,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.AuthView}>
              <Text style={styles.AuthTitle}>Sign In</Text>
              <Text style={styles.AuthSubTitle}>
                Authenticate yourself to continue using bervity.
              </Text>
              <View style={styles.AuthInnerView}>
                <Pressable style={styles.AuthBtn}>
                  <Image
                    style={styles.AuthServiceLogo}
                    source={require('./assets/images/icons/github-icon.png')}
                  />
                  <Text style={styles.AuthBtnText}>Github</Text>
                </Pressable>
                <Pressable style={styles.AuthBtn}>
                  <Image
                    style={styles.AuthServiceLogo}
                    source={require('./assets/images/icons/google-icon.png')}
                  />
                  <Text style={styles.AuthBtnText}>Google</Text>
                </Pressable>
              </View>
              <Pressable>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: 'black',
                    fontSize: 15,
                    fontWeight: '500',
                    marginTop: 15,
                    textAlign: 'center',
                  }}>
                  I don’t want to sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        ''
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  AuthView: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
  },
  AuthInnerView: {
    marginTop: 15,
  },
  AuthTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
  },
  AuthSubTitle: {
    color: 'black',
    fontSize: 18,
  },
  AuthServiceLogo: {
    width: 26,
    height: 26,
    objectFit: 'contain',
  },
  AuthBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    gap: 8,
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  AuthBtnText: {color: 'black', fontSize: 19, fontWeight: '500'},
});
