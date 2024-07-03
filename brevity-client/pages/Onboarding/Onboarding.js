import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.OnboardingView}>
      <Text>Onboarding</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <Text>Continue</Text>
      </Pressable>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  OnboardingView: {
    backgroundColor: 'white',
    flex: 1,
  },
});
