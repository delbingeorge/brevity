import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authState, userInfo} from '../../provider/RecoilStore';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {
  const navigation = useNavigation();
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('userInfo');
      setAuthValue(false);
      setUserInfoState({});
      navigation.navigate('FeedPage');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.SettingsView}>
      <StatusBar backgroundColor={'white'} />
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>Settings</Text>
      </Pressable>
      <View>
        <View style={styles.AccountSettings}>
          <TouchableOpacity onPress={signOut} style={styles.Settings}>
            <Image
              style={styles.SettingsImage}
              source={require('../../assets/images/icons/signout-icon.png')}
            />
            <Text style={styles.SettingsText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  SettingsView: {
    backgroundColor: 'white',
    flex: 1,
  },
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 13,
    paddingVertical: 12,
    borderBottomWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  GoBackIcon: {
    width: 25,
    height: 25,
  },
  GoBackText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: 'black',
  },
  AccountSettings: {
    paddingHorizontal: 15,
  },
  Settings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 7,
    gap: 15,
  },
  SettingsImage: {
    width: 16,
    height: 16,
  },
  SettingsText: {color: 'black', fontSize: 16.8, fontFamily: 'Inter-Medium'},
});
