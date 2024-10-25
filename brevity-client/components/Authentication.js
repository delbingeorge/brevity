// Module imports
import axios from 'axios';
import * as Burnt from 'burnt';
import React, {useState} from 'react';
import Config from 'react-native-config';
import ReactNativeModal from 'react-native-modal';
import {useRecoilState, useRecoilValue} from 'recoil';
import colorScheme from '../assets/colors/colorScheme';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  authState,
  getTheme,
  modalView,
  newUser,
  userInfo,
} from '../provider/RecoilStore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Authentication = () => {
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);
  const [newUserState, setNewUserState] = useRecoilState(newUser);
  const [loading, setLoading] = useState(false);
  const URL = Config.BASE_URL;
  const navigation = useNavigation();
  const theme = useRecoilValue(getTheme);
  const styles = createStyle(theme);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const username = userInfo.user.email.split('@');

      const idToken = userInfo.idToken;

      const response = await axios.post(`${URL}/api/google-signin`, {
        name: userInfo.user.name,
        username: username[0],
        email: userInfo.user.email,
        bio: 'i love to code.',
        photo: userInfo.user.photo,
        linkFirst: '',
        linkSecond: '',
        linkThird: '',
        linkForth: '',
        idToken: idToken,
      });

      if (response.status == 200) {
        if (response.data['newUser'] == true) {
          navigation.navigate('OnboardingScreen');
        }
        setUserInfoState(response.data.user);
        await AsyncStorage.setItem(
          'authToken',
          JSON.stringify(response.data.token),
        );
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.user),
        );
        await AsyncStorage.setItem(
          'authValue',
          JSON.stringify(response.data['authValue']),
        );
        setNewUserState(response.data['newUser']);
        setAuthValue(response.data['authValue']);
        setShowModalView(false);
        setLoading(false);
        Burnt.toast({
          title: 'Authenticated!',
          preset: 'done',
          haptic: 'success',
          duration: 5,
          from: 'top',
        });
      } else {
        Burnt.toast({
          title: response.statusText,
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Burnt.toast({
          title: 'Authentication cancelled by user!',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Burnt.toast({
          title: 'Sign in is already in progress.',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Burnt.toast({
          title: 'Google Play Services are not available or outdated.',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      } else {
        Burnt.toast({
          title: error,
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      }
    }
  };

  return (
    <ReactNativeModal
      style={styles.ReactModal}
      isVisible={showModalView}
      onBackdropPress={() => {
        setShowModalView(false);
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="black">
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      {loading == false ? (
        <View style={styles.AuthView}>
          <Text style={styles.AuthTitle}>Sign In</Text>
          <Text style={styles.AuthSubTitle}>
            Authenticate yourself to continue using bervity.
          </Text>
          <View style={styles.AuthInnerView}>
            {/* <TouchableOpacity style={styles.AuthBtn} onPress={signInWithGithub}>
          <Image
            style={styles.AuthServiceLogo}
            source={require('../assets/images/icons/github-icon.png')}
          />
          <Text style={styles.AuthBtnText}>Github</Text>
        </TouchableOpacity> */}

            <TouchableOpacity style={styles.AuthBtn} onPress={signInWithGoogle}>
              <Image
                style={styles.AuthServiceLogo}
                source={require('../assets/images/icons/google-icon.png')}
              />
              <Text style={styles.AuthBtnText}>Google</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={() => {
              setShowModalView(false);
            }}>
            <Text style={styles.SubText}>I don’t want to sign in</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.AuthViewLoader}>
          {/* <Image
              style={{
                width: 120,
                height: 120,
                objectFit: 'contain',
              }}
              source={require('../assets/images/logo/brevity-app-logo.png')}
            /> */}
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16.2,
                color:
                  theme === 'dark'
                    ? colorScheme.darkTheme.light
                    : colorScheme.lightTheme.dark,
                textAlign: 'center',
                fontFamily: 'Inter-SemiBold',
                marginBottom: 5,
              }}>
              Hang tight!
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: theme === 'dark' ? '#C2C8CF' : 'rgba(0,0,0,0.7)',
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
              }}>
              We're brewing some fresh code coffee.
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: theme === 'dark' ? '#C2C8CF' : 'rgba(0,0,0,0.7)',
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
              }}>
              This won't take long!
            </Text>
          </View>
          <ActivityIndicator size="large" color="#548DFE" />
        </View>
      )}
    </ReactNativeModal>
  );
};

export default Authentication;

const createStyle = theme =>
  StyleSheet.create({
    AuthView: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 25,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      width: Dimensions.get('screen').width,
    },
    AuthViewLoader: {
      alignItems: 'center',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 40,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['pitch-grey']
          : colorScheme.lightTheme['off-white'],
      width: Dimensions.get('screen').width,
    },
    AuthInnerView: {
      marginTop: 15,
    },
    AuthTitle: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-SemiBold',
      fontSize: 22,
    },
    AuthSubTitle: {
      color: theme === 'dark' ? '#C2C8CF' : '#39404A',
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
      gap: 10,
      marginBottom: 10,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['pitch-grey']
          : colorScheme.lightTheme['off-white'],
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    AuthBtnText: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.darkTheme.dark,
      fontSize: 19,
      fontFamily: 'Inter-Medium',
    },
    SubText: {
      textDecorationLine: 'underline',
      color: theme === 'dark' ? '#C2C8CF' : '#39404A',
      fontSize: 15,
      fontFamily: 'Inter-Medium',
      marginTop: 15,
      textAlign: 'center',
    },
    ReactModal: {
      margin: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });
