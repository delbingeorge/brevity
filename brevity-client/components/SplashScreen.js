import {Image, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.ParentView}>
      <StatusBar barStyle={'light-content'} />
      <Image
        style={styles.SplashImageLogo}
        source={require('../assets/images/logo/brevity.png')}
      />
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
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SplashImageLogo: {
    width: 130,
    height: 130,
    objectFit: 'contain',
  },
  SplashImage: {
    display: 'none',
    width: 155,
    height: 40,
    objectFit: 'contain',
  },
});

export default SplashScreen;
