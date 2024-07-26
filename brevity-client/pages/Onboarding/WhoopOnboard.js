import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const WhoopOnboard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.OnboardingView}>
      <View
        style={{
          alignItems: 'center',
          width: '80%',
          justifyContent: 'center',
          marginBottom: 85,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            textAlign: 'center',
            fontSize: 25,
            color: 'black',
          }}>
          Join “whoop” & talk.
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            textAlign: 'center',
            color: '#323232',
            fontSize: 17,
          }}>
          Share your thoughts and code with a large community to get feedback
          and to refine your skills.
        </Text>
      </View>
      <View>
        <Image
          style={{
            width: 500,
            height: 590,
            objectFit: 'scale-down',
          }}
          source={require('../../assets/images/onboarding/whoop-talk.png')}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('TabNavigation');
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
    </SafeAreaView>
  );
};

export default WhoopOnboard;

const styles = StyleSheet.create({
  OnboardingView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
