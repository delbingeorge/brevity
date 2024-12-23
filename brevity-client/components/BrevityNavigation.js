// Module imports
import {useRecoilState, useRecoilValue} from 'recoil';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect} from 'react';
import {authState, getTheme, userInfo} from '../provider/RecoilStore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Burnt from 'burnt';

// Component imports
import IssuePostForm from '../pages/IssuePostForm/IssuePostForm';
import ProfileRank from '../pages/ProfileRank/ProfileRank';
import FeedPage from '../pages/FeedPage/FeedPage';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import ListsPage from '../pages/ListsPage/ListsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import YourLists from '../pages/ProfilePage/YourLists';
import SettingsPage from '../pages/ProfilePage/SettingsPage';
import EditProfile from '../pages/ProfilePage/EditProfile';
import IssueComponent from './IssueComponent';
import ListHomePage from '../pages/ListHomePage/ListHomePage';
import ScreamPage from '../pages/ListHomePage/ScreamPage/ScreamPage';
import IssuePostStatus from './IssuePostStatus';
import PostedIssues from '../pages/ProfilePage/PostedIssues';
import ManageIssue from './ManageIssue';
import Onboarding from '../pages/Onboarding/Onboarding';
import WhoopOnboard from '../pages/Onboarding/WhoopOnboard';
import OnboardClosure from '../pages/Onboarding/OnboardClosure';
import colorScheme from '../assets/colors/colorScheme';

const TabRoute = createBottomTabNavigator();
const StackRoute = createNativeStackNavigator();

function TabNavigation() {
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);
  const useTheme = useRecoilValue(getTheme);

  const styles = createStyle(useTheme);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUserInfoState(userInfo);
        setAuthValue(true);
      }
    } catch (error) {
      Burnt.toast({
        title: 'Error fetching user info!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  return (
    <TabRoute.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          // marginTop: -5,
        },
        tabBarStyle: {
          backgroundColor:
            useTheme === 'dark'
              ? colorScheme.darkTheme['primary-dark']
              : colorScheme.lightTheme['primary-light'],
          display: authValue == true ? 'flex' : 'none',
          borderTopColor:
            useTheme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          height: 55,
        },
        tabBarHideOnKeyboard: true,
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
        name="OnboardingScreen"
        component={Onboarding}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="WhoopOnboard"
        component={WhoopOnboard}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="OnboardClosure"
        component={OnboardClosure}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="IssuePostForm"
        component={IssuePostForm}
      />
      <StackRoute.Screen
        name="IssueComponent"
        options={{
          headerShown: false,
          title: '',
        }}
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
      <StackRoute.Screen
        name="ListHomePage"
        options={{headerShown: false}}
        component={ListHomePage}
      />
      <StackRoute.Screen name="YourLists" component={YourLists} />
      <StackRoute.Screen
        options={{headerShown: false}}
        name="SettingsPage"
        component={SettingsPage}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="ScreamPage"
        component={ScreamPage}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="IssuePostStatus"
        component={IssuePostStatus}
      />
      <StackRoute.Screen
        options={{headerShown: false, animation: 'slide_from_right'}}
        name="PostedIssues"
        component={PostedIssues}
      />
      <StackRoute.Screen
        options={{headerShown: false}}
        name="ManageIssue"
        component={ManageIssue}
      />
    </StackRoute.Navigator>
  );
}

export default BrevityNavigation;

const createStyle = theme =>
  StyleSheet.create({
    NavIcon: {
      height: 24,
      width: 24,
      tintColor:
        theme === 'dark' ? 'rgba(255,255,255,0.7)' : colorScheme.darkTheme.dark,
    },
    IconFocused: {
      height: 24,
      width: 24,
      tintColor: theme === 'dark' ? 'rgba(255,255,255,1)' : 'blue',
    },
  });
