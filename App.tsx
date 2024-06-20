import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import BottomNavBar from './components/BottomNavBar';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const authValue = !true;
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <BottomNavBar />
      {authValue ? (
        <Modal>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.50)',
              height: Dimensions.get('screen').height,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.AuthView}>
              {/* <Pressable
                style={{
                  width: 75,
                  height: 4,
                  borderRadius: 15,
                  position: 'absolute',
                  top: 4,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}></Pressable> */}
              <Text style={styles.AuthTitle}>Sign In</Text>
              <Text style={styles.AuthSubTitle}>
                Authenticate yourself to continue using bervity.
              </Text>
              <View style={styles.AuthInnerView}>
                <TouchableOpacity style={styles.AuthBtn}>
                  <Image
                    style={styles.AuthServiceLogo}
                    source={require('./assets/images/icons/github-icon.png')}
                  />
                  <Text style={styles.AuthBtnText}>Github</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.AuthBtn}>
                  <Image
                    style={styles.AuthServiceLogo}
                    source={require('./assets/images/icons/google-icon.png')}
                  />
                  <Text style={styles.AuthBtnText}>Google</Text>
                </TouchableOpacity>
              </View>
              <Pressable>
                <Text style={styles.SubText}>I don’t want to sign in</Text>
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
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    height: Dimensions.get('screen').height / 2.3,
    width: Dimensions.get('screen').width,
  },
  AuthInnerView: {
    marginTop: 15,
  },
  AuthTitle: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
  },
  AuthSubTitle: {
    color: '#39404A',
    fontFamily: 'Inter-Regular',
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
  AuthBtnText: {color: 'black', fontSize: 19, fontFamily: 'Inter-Medium'},
  SubText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    marginTop: 15,
    textAlign: 'center',
  },
});
