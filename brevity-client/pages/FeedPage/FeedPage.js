import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IssueComponent from '../../components/IssueComponent';
import {
  authState,
  modalView,
  newUser,
} from '../../provider/RecoilStore';
import {useRecoilState} from 'recoil';
import ReactModal from '../../components/ReactModal';
// import * as Burnt from 'burnt';

const FeedPage = () => {
  const navigation = useNavigation();
  const authValue = useRecoilState(authState);
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [newUserState, setNewUserState] = useRecoilState(newUser);

  return (
    <SafeAreaView style={styles.MainView}>
      <View style={styles.NavView}>
        <Pressable>
          <Image
            style={styles.NavLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
        </Pressable>

        <Pressable
          style={{display: authValue[0] == true ? 'flex' : 'none'}}
          onPress={() => {
            navigation.navigate('ProfileRank');
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/crown-rank.png')}
          />
        </Pressable>

        <Pressable
          style={{display: authValue[0] == true ? 'none' : 'flex'}}
          onPress={() => {
            setShowModalView(true);
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/profile-icon-bk.png')}
          />
        </Pressable>
      </View>
      <ScrollView>
        <Pressable
          style={{paddingBottom: 80}}
          onPress={() => {
            navigation.navigate('IssueComponent');
          }}>
          <IssueComponent />
          <IssueComponent />
          <IssueComponent />
        </Pressable>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: '#548DFE',
          height: 45,
          width: 45,
          borderRadius: 50,
          display: authValue[0] == true ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 110,
          right: 20,
        }}
        onPress={() => navigation.navigate('IssuePostForm')}>
        <Image
          style={{height: 19, width: 19}}
          source={require('../../assets/images/icons/issue-post-plus-icon.png')}
        />
      </TouchableOpacity>
      {showModalView === true ? <ReactModal /> : ''}

      {/* {newUserState == true ? (
        <View style={{backgroundColor: 'red', position: 'absolute', top: 0}}>
          <Text style={{color: 'green'}}>Howllo</Text>
        </View>
      ) : (
        console.log('old user')
      )} */}

    </SafeAreaView>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
    // paddingHorizontal: 15,
    height: Dimensions.get('screen').height,
  },
  NavView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
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
