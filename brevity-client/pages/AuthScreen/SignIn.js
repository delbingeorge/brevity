import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <KeyboardAvoidingView style={styles.SignIn}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.SignInHeader}>
        {/* <Image
          style={styles.NavAppLogo}
          source={require('../../assets/images/logo/brevity-app-logo.png')}
        /> */}
        <Image
          style={styles.NavLogo}
          source={require('../../assets/images/logo/brevity.png')}
        />
        <Text style={styles.SignInText}>
          Welcome back! It's great to see you again.
        </Text>
      </View>
      <View style={styles.SignInInput}>
        <TextInput
          style={styles.TextInput}
          placeholder="yourname@example.com"
        />
        <TextInput
          style={styles.TextInput}
          placeholder="yourname@example.com"
        />
        <Pressable style={styles.SignInButton}>
          <Text style={styles.SignInButtonText}>Continue</Text>
        </Pressable>
      </View>
      <Pressable style={styles.SignUpButton}>
        <Text style={styles.SignUpText}>Join our family!</Text>
        <Text style={styles.SignUpTextButton}>create an account.</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  SignIn: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  SignInHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  NavAppLogo: {
    width: 100,
    height: 120,
    objectFit: 'contain',
  },
  NavLogo: {
    width: 160,
    height: 60,
    objectFit: 'contain',
  },
  SignInInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 14,
  },
  SignInText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    textAlign: 'center',
    width: 250,
    color: 'black',
  },
  TextInput: {
    width: '90%',
    backgroundColor: '#F6F6F6',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 16,
    borderRadius: 8,
  },
  SignInButton: {
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  SignInButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 19,
  },
  SignUpButton: {
    position: 'absolute',
    marginVertical: 10,
    bottom: 0,
    right: 0,
    left: 0,
  },
  SignUpText: {
    fontFamily: 'Inter-SemiBold',
    color: '#1363FF',
    textAlign: 'center',
  },
  SignUpTextButton: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
