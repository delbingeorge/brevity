import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
// import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = () => {
  return (
    <View style={styles.MainView}>
      {/* <View style={styles.NavView}>
        <Image
          style={styles.NavLogo}
          source={require('../assets/images/logo/brevity.png')}
        />
        <Image
          style={styles.CrownRank}
          source={require('../assets/images/icons/crown-rank.png')}
        />
      </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  MainView: {
    paddingHorizontal: 15,
  },
  NavView: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NavLogo: {
    height: 27,
    width: 100,
    objectFit: 'contain',
  },
  CrownRank: {
    height: 25,
    width: 25,
  },
  BottomNavBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  NavHome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-medium',
  },
});
