import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {newUser} from '../../provider/RecoilStore';

const OnboardClosure = () => {
  const [newUserStatus, setNewUserStatus] = useRecoilState(newUser);
  const navigation = useNavigation();
  return (
    <View style={styles.OnboardingView}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={styles.AppLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              textAlign: 'center',
              color: '#323232',
              fontSize: 17,
              width: 270,
            }}>
            Because sometimes, even Stack Overflow needs a backup.
          </Text>
        </View>
        <View>
          <Image
            style={{width: 300, height: 300}}
            source={require('../../assets/images/onboarding/welcome-illustration.png')}
          />
        </View>
      </View>
      <View style={styles.EditActionBtn}>
        <TouchableOpacity
          style={styles.ActionBtn}
          onPress={() => {
            setNewUserStatus(false);
            navigation.navigate('TabNavigation');
          }}>
          <Text style={styles.BtnText}>Explore Brevity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardClosure;

const styles = StyleSheet.create({
  OnboardingView: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    padding: 0,
  },
  AppLogo: {
    height: 60,
    width: 130,
    objectFit: 'contain',
    marginBottom: -10,
  },
  EditActionBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: 'white',
    bottom: 0,
    width: Dimensions.get('screen').width,
    // backgroundColor: 'black',
  },
  ActionBtn: {
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#5BBDFF',
    borderRadius: 10,
  },
  BtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
});
