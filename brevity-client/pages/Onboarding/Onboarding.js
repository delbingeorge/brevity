import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {newUser} from '../../provider/RecoilStore';

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.OnboardingView}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Pressable
        style={{
          position: 'absolute',
          top: 5,
          right: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 2,
          paddingHorizontal: 5,
        }}
        onPress={() => {
          navigation.navigate('WhoopOnboard');
        }}>
        <Text style={{color: 'black', fontFamily: 'Inter-Medium'}}>Next</Text>
        {/* <Image
          style={{width: 18, height: 18}}
          source={require('../../assets/images/icons/go-front-arrow-bk.png')}
        /> */}
      </Pressable>
      <View
        style={{
          alignItems: 'center',
          width: '80%',
          justifyContent: 'center',
          marginBottom: 205,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            fontSize: 20,
            color: 'black',
          }}>
          Join any team!
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: '#323232',
            fontSize: 16,
            textAlign: 'center',
          }}>
          A place where devs around the world help and grow each other.
        </Text>
      </View>
      <View>
        <Image
          style={{
            width: Dimensions.get('screen').width,
            height: 350,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding/explore-brevity.png')}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  OnboardingView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  AppLogo: {
    height: 60,
    width: 130,
    objectFit: 'contain',
  },
});
