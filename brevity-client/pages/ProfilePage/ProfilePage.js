import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ReactNativeModal} from 'react-native-modal';
import {useRecoilValue} from 'recoil';
import {userInfo} from '../../provider/RecoilStore';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const profileInfo = useRecoilValue(userInfo);

  const date = new Date(profileInfo['created_at']);
  const accountCreationDate = date.getFullYear();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <View style={styles.ProfileDetails}>
        <Image
          style={styles.ProfileImage}
          source={
            profileInfo['photo'] &&
            profileInfo['photo'].startsWith('https://lh3.googleusercontent.com')
              ? {uri: profileInfo['photo']}
              : {
                  // uri: `http://192.168.1.105:8000/storage/${profileInfo[0].photo}`,
                  uri: `http://206.189.143.236/storage/${profileInfo['photo']}`,
                }
          }
        />
        <Text style={styles.ProfileName}>{profileInfo['name']}</Text>
        <Text style={styles.UserName}>{profileInfo['email']}</Text>
      </View>
      <View style={styles.ProfileTab}>
        <View>
          <Text style={styles.SectionTitle}>Account Management</Text>
          <View style={styles.AccountSettings}>
            <TouchableOpacity
              onPress={() => {
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
              onPress={() => setModalVisible(true)}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/eye-icon-color.png')}
              />
              <Text style={styles.SettingsText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
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
                navigation.navigate('YourLists');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/list-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Your Lists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Settings}
              onPress={() => {
                navigation.navigate('YourLists');
              }}>
              <Image
                style={styles.SettingsImage}
                source={require('../../assets/images/icons/settings/posted-issues-icon-color.png')}
              />
              <Text style={styles.SettingsText}>Posted Issues</Text>
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

      <ReactNativeModal
        style={styles.ReactModal}
        isVisible={isModalVisible}
        onBackdropPress={() => {
          toggleModal(false);
        }}
        backdropColor="black">
        <View style={styles.ProfileModal}>
          {/* <Pressable
            style={styles.ModalCloseTab}
            onPress={() => {
              toggleModal(false);
            }}></Pressable> */}
          <Image
            style={styles.ProfileImage}
            source={
              profileInfo['photo'] &&
              profileInfo['photo'].startsWith(
                'https://lh3.googleusercontent.com',
              )
                ? {uri: profileInfo['photo']}
                : {
                    // uri: `http://192.168.1.105:8000/storage/${profileInfo[0].photo}`,
                    uri: `http://206.189.143.236/storage/${profileInfo['photo']}`,
                  }
            }
          />
          <Text style={styles.ProfileName}>{profileInfo['name']}</Text>
          <Text style={styles.UserName}>Epic Compiler</Text>

          <View style={styles.ModalView}>
            <Text style={styles.IssueCount}>1900</Text>
            <Text style={styles.AccountSince}>
              Issues solved since {accountCreationDate}
            </Text>
          </View>
          <View style={styles.SocialView}>
            {profileInfo['linkFirst'] != 'null' ? (
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL(profileInfo['linkFirst']);
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/github-icon.png')}
                />
              </Pressable>
            ) : (
              ''
            )}
            {profileInfo['linkSecond'] != 'null' ? (
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL(profileInfo['linkSecond']);
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/linkedin-icon.png')}
                />
              </Pressable>
            ) : (
              ''
            )}
            {profileInfo['linkThird'] != 'null' ? (
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL(profileInfo['linkThird']);
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/youtube-icon.png')}
                />
              </Pressable>
            ) : (
              ''
            )}
            {profileInfo['linkForth'] != 'null' ? (
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL(profileInfo['linkForth']);
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/external-icon.png')}
                />
              </Pressable>
            ) : (
              ''
            )}
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  ProfileDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 3.2,
    backgroundColor: '#F6F6F6',
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderWidth: 3.5,
    borderColor: 'black',
    borderRadius: 50,
    marginBottom: 5,
  },
  ProfileName: {color: 'black', fontSize: 19, fontFamily: 'Inter-SemiBold'},
  UserName: {color: 'black', fontSize: 13, fontFamily: 'Inter-Medium'},
  SectionTitle: {
    color: 'black',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 7,
    fontFamily: 'Inter-SemiBold',
  },
  ProfileTab: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: Dimensions.get('screen').height,
    borderRadius: 30,
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
  ProfileModal: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: Dimensions.get('screen').height / 2.1,
    width: Dimensions.get('screen').width,
  },
  ReactModal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ModalView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  IssueCount: {
    fontSize: 45,
    fontFamily: 'Inter-ExtraBold',
    color: 'black',
  },
  AccountSince: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: 'black',
    marginTop: -7,
  },
  ModalCloseTab: {
    position: 'absolute',
    top: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100,
    width: 120,
    height: 4,
  },
  SocialView: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    marginTop: 4,
  },
  SocialButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f6f6f6',
  },
  SocialIcon: {
    width: 30,
    height: 30,
  },
});
