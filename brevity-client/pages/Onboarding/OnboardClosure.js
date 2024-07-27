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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 17,
            color: 'rgba(0,0,0,0.5)',
            marginBottom: -10,
          }}>
          Welcome to
        </Text>
        <Image
          style={styles.AppLogo}
          source={require('../../assets/images/logo/brevity.png')}
        />
      </View>
      <View>
        <Image
          style={{
            width: Dimensions.get('screen').width,
            height: 600,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding/get-started.png')}
        />
      </View>
    </View>
    
    <View style={styles.EditActionBtn}>
        <TouchableOpacity
          style={styles.ActionBtn}
          onPress={() => {
            navigation.navigate('ExplorePage');
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
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  AppLogo: {
    height: 60,
    width: 130,
    objectFit: 'contain',
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
    backgroundColor: '#000',
    borderRadius: 10,
  },
  BtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
});
