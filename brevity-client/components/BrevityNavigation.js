import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import IssuePostForm from '../pages/IssuePostForm/IssuePostForm';
import ProfileRank from '../pages/ProfileRank/ProfileRank';
import FeedPage from '../pages/FeedPage/FeedPage';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import ListsPage from '../pages/ListsPage/ListsPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import YourLists from '../pages/ProfilePage/YourLists';
import SettingsPage from '../pages/ProfilePage/SettingsPage';
import EditProfile from '../pages/ProfilePage/EditProfile';
import IssueComponent from './IssueComponent';
import {useRecoilState} from 'recoil';
import {authState} from '../provider/RecoilStore';
import ReactModal from './ReactModal';
import SignIn from '../pages/AuthScreen/SignIn';

const TabRoute = createBottomTabNavigator();
const StackRoute = createNativeStackNavigator();

function TabNavigation() {
  const [authValue, setAuthValue] = useRecoilState(authState);
  return (
    <TabRoute.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <TabRoute.Screen
        name="FeedPage"
        component={FeedPage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={focused ? styles.IconFocused : styles.NavIcon}
                source={require('../assets/images/icons/home-icon-bk.png')}
              />
            );
          },
        }}
      />
      <TabRoute.Screen
        name="ExplorePage"
        component={ExplorePage}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={focused ? styles.IconFocused : styles.NavIcon}
                source={require('../assets/images/icons/discovery-icon-bk.png')}
              />
            );
          },
        }}
      />
      <TabRoute.Screen
        name="ListsPage"
        component={ListsPage}
        options={{
          tabBarLabel: 'Lists',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={focused ? styles.IconFocused : styles.NavIcon}
                source={require('../assets/images/icons/list-icon-bk.png')}
              />
            );
          },
        }}
      />
      <TabRoute.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={focused ? styles.IconFocused : styles.NavIcon}
                source={require('../assets/images/icons/profile-icon-bk.png')}
              />
            );
          },
        }}
      />
    </TabRoute.Navigator>
  );
}

function BrevityNavigation() {
  return (
    <StackRoute.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 18,
        },
        headerShadowVisible: false,
        animation: 'ios',
      }}>
      <StackRoute.Screen
        options={{headerShown: false}}
        name="TabNavigation"
        component={TabNavigation}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="IssuePostForm"
        component={IssuePostForm}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="SignIn"
        component={SignIn}
      />
      <StackRoute.Screen
        name="IssueComponent"
        options={{title: ''}}
        component={IssueComponent}
      />
      <StackRoute.Screen
        options={{headerShown: false}}
        name="ProfileRank"
        component={ProfileRank}
      />
      <StackRoute.Screen
        options={{headerShown: false}}
        name="ProfilePage"
        component={ProfilePage}
      />
      <StackRoute.Screen
        name="EditProfile"
        options={{headerShown: false}}
        component={EditProfile}
      />
      <StackRoute.Screen name="YourLists" component={YourLists} />
      {/* <StackRoute.Screen
        options={{headerShown: false}}
        name="PublicProfile"
        component={PublicProfile}
      /> */}
      <StackRoute.Screen
        options={{headerShown: false}}
        name="SettingsPage"
        component={SettingsPage}
      />
    </StackRoute.Navigator>
  );
}

export default BrevityNavigation;

const styles = StyleSheet.create({
  NavIcon: {
    height: 24,
    width: 24,
  },
  IconFocused: {
    height: 24,
    width: 24,
    color: 'blue',
    tintColor: 'blue',
  },
});
