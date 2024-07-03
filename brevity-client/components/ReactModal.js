import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {authState, modalView, userInfo} from '../provider/RecoilStore';
import {useRecoilState} from 'recoil';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactModal = () => {
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const response = await axios.post(
        'http://192.168.1.105:8000/api/google-signin',
        {
          name: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        },
      );

      if (response.status == 200) {
        setUserInfoState(response.data.user);
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.user),
        );
        await AsyncStorage.setItem(
          'authValue',
          JSON.stringify(response.data['authValue']),
        );
        setAuthValue(response.data['authValue']);
        setShowModalView(false);
        setLoading(false);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in was cancelled by the user.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services are not available or outdated.');
      } else {
        console.log('An unknown error occurred. Please try again.');
        console.error(error);
      }
    }
  };

  return (
    <>
      <ReactNativeModal
        style={styles.ReactModal}
        isVisible={showModalView}
        onBackdropPress={() => {
          setShowModalView(false);
        }}
        animationIn={'slideInUp'}
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
              <TouchableOpacity
                style={styles.AuthBtn}
                onPress={signInWithGoogle}>
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
            <Image
              style={{
                width: 120,
                height: 120,
                objectFit: 'contain',
              }}
              source={require('../assets/images/logo/brevity-app-logo.png')}
            />
            <View style={{marginVertical:15}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: 'Inter-Medium',
                }}>
                Hold on for a moment
              </Text>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: 'Inter-Medium',
                }}>
                We are setting up brevity!
              </Text>
            </View>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </ReactNativeModal>
    </>
  );
};

export default ReactModal;

const styles = StyleSheet.create({
  IssueComponent: {
    borderBottomColor: '#D9D9D9',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    paddingVertical: 10,
    // marginVertical: 8,
    paddingHorizontal: 15,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  HeaderUserName: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  HeaderDivider: {
    fontSize: 27,
    color: '#687684',
  },
  HeaderListName: {
    fontSize: 15,
    color: '#687684',
  },

  IssueUserProfileModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Issue Content Styling
  IssueContent: {rowGap: 5},
  IssueTitle: {color: 'black', fontSize: 18, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 17, lineHeight: 24},

  // Issue Action Styling

  IssueActionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IssueAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 20, height: 20},
  IssueActionCount: {color: 'black', fontSize: 16, fontFamily: 'Inter-Medium'},
  AuthView: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    // height: Dimensions.get('screen').height / 2.9,
    width: Dimensions.get('screen').width,
  },
  AuthViewLoader: {
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    // height: Dimensions.get('screen').height / 2.9,
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
    paddingVertical: 11,
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
  ReactModal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
