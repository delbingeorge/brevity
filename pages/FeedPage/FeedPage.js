import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import IssuePost from '../../components/IssuePost';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListsPage from '../ListsPage/ListsPage';
import IssuePostForm from '../IssuePostForm/IssuePostForm';
import {useNavigation} from '@react-navigation/native';
import IssueComponent from '../../components/IssueComponent';

const StackRoute = createNativeStackNavigator();

const FeedPage = () => {
  const navigation = useNavigation();
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
      <StackRoute.Navigator screenOptions={{headerShown: false}}>
        <StackRoute.Screen name="Text" component={IssueComponent} />
        <StackRoute.Screen name="IssuePostFrame" component={IssuePostForm} />
      </StackRoute.Navigator>
      <TouchableOpacity
        style={{
          backgroundColor: '#548DFE',
          height: 45,
          width: 45,
          borderRadius: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 105,
          right: 20,
        }}
        onPress={() => navigation.navigate('IssuePostFrame')} // Use navigation.navigate to push IssuePostForm onto the stack
      >
        <Image
          style={{height: 19, width: 19}}
          source={require('../../assets/images/icons/issue-post-plus-icon.png')}
        />
      </TouchableOpacity>
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
