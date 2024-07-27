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

const IssueOnboard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.OnboardingView}>
      <Pressable
        style={{
          position: 'absolute',
          top: 5,
          right: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 3,
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
          marginBottom: 65,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            textAlign: 'center',
            fontSize: 25,
            color: 'black',
          }}>
          Resolve Your Bugs!
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            textAlign: 'center',
            color: '#323232',
            fontSize: 17,
          }}>
          With the Global Community behind you, you can conquer the Issueverest.
        </Text>
      </View>
      <View>
        <Image
          style={{
            width: Dimensions.get('screen').width,
            height: 600,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding/issue-post.png')}
        />
      </View>
      {/* <Pressable
        onPress={() => {
          navigation.navigate('WhoopOnboard');
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
      </Pressable> */}
    </SafeAreaView>
  );
};

export default IssueOnboard;

const styles = StyleSheet.create({
  OnboardingView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
