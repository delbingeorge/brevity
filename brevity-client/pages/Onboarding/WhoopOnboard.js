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
          paddingHorizontal: 7,
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 0,
            paddingHorizontal: 5,
          }}
          onPress={() => {
            navigation.navigate('OnboardClosure');
          }}>
          <Text style={{color: 'black', fontFamily: 'Inter-Medium'}}>Next</Text>
          {/* <Image
            style={{width: 18, height: 18}}
            source={require('../../assets/images/icons/go-front-bk.png')}
          /> */}
        </Pressable>
      </View>
      <View style={{width: '80%', marginTop: 80}}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
          }}>
          Whoop & talk.
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
            color: '#323232',
            fontSize: 16,
          }}>
          Share your thoughts and code with a large community to get feedback
          and to refine your skills.
        </Text>
      </View>
      <View>
        <Image
          style={{
            height: '95%',
            width: Dimensions.get('window').width,
            objectFit: 'contain',
          }}
          source={require('../../assets/images/onboarding/whoop-talk.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default WhoopOnboard;

const styles = StyleSheet.create({
  OnboardingView: {
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
