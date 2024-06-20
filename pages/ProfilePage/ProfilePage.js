import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EditProfile from './EditProfile';
import {useNavigation} from '@react-navigation/native';

const ProfilePage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <StatusBar backgroundColor={'#F6F6F6'} />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height / 3.2,
          backgroundColor: '#F6F6F6',
        }}>
        <Image
          style={{width: 95, height: 95}}
          source={require('../../assets/images/icons/user-default-image.png')}
        />
        <Text
          style={{color: 'black', fontSize: 19, fontFamily: 'Inter-SemiBold'}}>
          Rakshitha M
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          height: Dimensions.get('screen').height,
          borderRadius: 30,
        }}>
        <View>
          <Text style={styles.SectionTitle}>Account Management</Text>
          <View style={styles.AccountSettings}>
            <TouchableOpacity
              onPress={() => {
                console.log('Navigating to EditProfile'); // Check if navigation works
                navigation.navigate('EditProfile');
              }}
              style={styles.Settings}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/user-profile-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
                console.log('Navigating to Public Profile'); // Check if navigation works
                navigation.navigate('PublicProfile');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/eye-icon-color.png')}
              />
              <Text style={styles.SettingsText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
                console.log('Navigating to ProfileRank'); // Check if navigation works
                navigation.navigate('ProfileRank');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/rank-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Track Journey</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
                console.log('Navigating to Your Lists'); // Check if navigation works
                navigation.navigate('YourLists');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/list-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Your Lists</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Settings}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/notify-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
                console.log('Navigating to Settings'); // Check if navigation works
                navigation.navigate('SettingsPage');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/gear-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  SectionTitle: {
    color: 'black',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 7,
    fontFamily: 'Inter-SemiBold',
  },
  AccountSettings: {},
  Settings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 7,
    gap: 15,
  },
  SettingsImage: {
    width: 38,
    height: 38,
  },
  SettingsText: {color: 'black', fontSize: 16.8, fontFamily: 'Inter-Medium'},
});
