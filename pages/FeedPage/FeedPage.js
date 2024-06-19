import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import IssuePost from '../../components/IssuePost';

const FeedPage = () => {
  return (
    <SafeAreaView style={styles.MainView}>
      <View style={styles.NavView}>
        <Image
          style={styles.NavLogo}
          source={require('../../assets/images/logo/brevity.png')}
        />
        <Image
          style={styles.CrownRank}
          source={require('../../assets/images/icons/crown-rank.png')}
        />
      </View>
      <IssuePost />
    </SafeAreaView>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: Dimensions.get('screen').height,
  },
  NavView: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NavLogo: {
    height: 22,
    width: 76,
    objectFit: 'contain',
  },
  CrownRank: {
    height: 24,
    width: 24,
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
