import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.ParentView}>
      <Image
        style={styles.SplashImage}
        source={require('../assets/images/logo/brevity.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ParentView: {
    height: Dimensions.get('window').height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SplashImage: {
    width: 155,
    height: 45,
  },
});

export default SplashScreen;
