import {
  Dimensions,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IssueComponent from '../../components/IssueComponent';
import {
  authState,
  modalView,
  newUser,
  userInfo,
} from '../../provider/RecoilStore';
import {useRecoilState} from 'recoil';
import ReactModal from '../../components/ReactModal';
import Onboarding from '../Onboarding/Onboarding';
import * as Burnt from 'burnt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const FeedPage = () => {
  const navigation = useNavigation();
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);

  const initializeApp = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        // Initialize Recoil state or any other state management here
        setUserInfoState(userInfo);
        setAuthValue(true); // Assuming user is authenticated if userInfo exists
      }
    } catch (error) {
      console.error('Error retrieving user info from AsyncStorage:', error);
    }
  };

  // Call initializeApp when your app starts or when necessary
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <SafeAreaView style={styles.MainView}>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.NavView}>
        <Pressable>
          <Image
            style={styles.NavLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
        </Pressable>
        <Pressable
          style={{display: authValue == true ? 'flex' : 'none'}}
          onPress={() => {
            navigation.navigate('ProfileRank');
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/crown-rank.png')}
          />
        </Pressable>
        <Pressable
          style={{display: authValue == true ? 'none' : 'flex'}}
          onPress={() => {
            setShowModalView(true);
            console.log('Auth profile button clicked!');
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
          display: authValue == true ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 110,
          right: 20,
        }}
        onPress={() => navigation.navigate('IssuePostForm')} // Use navigation.navigate to push IssuePostForm onto the stack
      >
        <Image
          style={{height: 19, width: 19}}
          source={require('../../assets/images/icons/issue-post-plus-icon.png')}
        />
      </TouchableOpacity>
      {showModalView === true ? <ReactModal /> : ''}
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
