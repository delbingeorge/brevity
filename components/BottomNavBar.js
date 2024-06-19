import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import FeedPage from '../pages/FeedPage/FeedPage';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import ListsPage from '../pages/ListsPage/ListsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

const TabRoute = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
    <TabRoute.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
        },
      }}>
      <TabRoute.Screen
        name="FeedPage"
        component={FeedPage}
        options={{
          tabBarLabel: 'Profile',
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
          tabBarLabel: 'Profile',
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
          tabBarLabel: 'Profile',
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
};

export default BottomNavBar;

const styles = StyleSheet.create({
  NavIcon: {
    height: 24,
    width: 24,
  },
  IconFocused: {
    height: 24,
    width: 24,
    tintColor: 'blue',
  },
  BottomNavBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  NavHome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Inter-semibold',
  },
});
