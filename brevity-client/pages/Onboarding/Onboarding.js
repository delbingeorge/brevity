import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {newUser} from '../../provider/RecoilStore';

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.OnboardingView}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 17,
              color: 'rgba(0,0,0,0.5)',
              marginBottom: -5,
            }}>
            Welcome to
          </Text>
          <Image
            style={styles.AppLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
        </View>
        {/* <View>
          <Image
            style={{width: 300, height: 300}}
            source={require('../../assets/images/onboarding/welcome-illustration.png')}
          />
        </View> */}
        <Pressable
          onPress={() => {
            navigation.navigate('IssueOnboard');
          }}
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: 'rgba(0,0,0,0.03)',
            position: 'absolute',
            right: 30,
            bottom: 30,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../assets/images/icons/go-front-arrow-bk.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Onboarding;

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
  },
});
