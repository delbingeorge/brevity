// Module imports
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {useRecoilState, useRecoilValue} from 'recoil';
import colorScheme from '../assets/colors/colorScheme';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  getTheme,
  ProfileModal,
  userInfo,
  UserProfileInfo,
} from '../provider/RecoilStore';

const ProfileView = () => {
  const profileInfo = useRecoilValue(userInfo);
  const ModalInfo = useRecoilValue(UserProfileInfo);
  const [profileModal, setProfileModal] = useRecoilState(ProfileModal);
  const theme = useRecoilValue(getTheme);
  const styles = createStyle(theme);

  return (
    <ReactNativeModal
      style={styles.ReactModal}
      isVisible={true}
      onBackdropPress={() => {
        setProfileModal(false);
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="black">
      <View style={styles.ProfileModal}>
        <Image
          style={styles.ProfileImage}
          source={
            ModalInfo['photo'] &&
            ModalInfo['photo'].startsWith('https://lh3.googleusercontent.com')
              ? {uri: ModalInfo['photo']}
              : {
                  uri: `${URL}/storage/${ModalInfo['photo']}`,
                }
          }
        />
        <Text style={styles.ProfileName}>{ModalInfo['name']}</Text>
        <Text style={styles.UserName}>Epic Compiler</Text>

        <View style={styles.ModalView}>
          <Text style={styles.IssueCount}>1900</Text>
          <Text style={styles.AccountSince}>Issues solved since {2024}</Text>
        </View>
        <View style={styles.SocialView}>
          {ModalInfo['linkFirst'] != 'null' ? (
            <Pressable
              style={styles.SocialButton}
              onPress={() => {
                Linking.openURL(ModalInfo['linkFirst']);
              }}>
              <Image
                style={styles.SocialIcon}
                source={require('../assets/images/icons/socials/github-icon.png')}
              />
            </Pressable>
          ) : null}
          {ModalInfo['linkSecond'] != 'null' ? (
            <Pressable
              style={styles.SocialButton}
              onPress={() => {
                Linking.openURL(ModalInfo['linkSecond']);
              }}>
              <Image
                style={styles.SocialIcon}
                source={require('../assets/images/icons/socials/linkedin-icon.png')}
              />
            </Pressable>
          ) : null}
          {ModalInfo['linkThird'] != 'null' ? (
            <Pressable
              style={styles.SocialButton}
              onPress={() => {
                Linking.openURL(ModalInfo['linkThird']);
              }}>
              <Image
                style={styles.SocialIcon}
                source={require('../assets/images/icons/socials/youtube-icon.png')}
              />
            </Pressable>
          ) : null}
          {ModalInfo['linkForth'] != 'null' ? (
            <Pressable
              style={styles.SocialButton}
              onPress={() => {
                Linking.openURL(ModalInfo['linkForth']);
              }}>
              <Image
                style={styles.SocialIcon}
                source={require('../assets/images/icons/socials/external-icon.png')}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ProfileView;

const createStyle = theme =>
  StyleSheet.create({
    ProfileImage: {
      width: 100,
      height: 100,
      borderWidth: 3.5,
      borderColor: 'black',
      borderRadius: 50,
      marginBottom: 5,
    },
    ProfileName: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontSize: 19,
      fontFamily: 'Inter-SemiBold',
    },
    UserName: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontSize: 13,
      fontFamily: 'Inter-Medium',
    },
    ProfileModal: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 40,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
    },
    AccountSince: {
      fontSize: 17,
      fontFamily: 'Inter-Medium',
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
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
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['pitch-grey']
          : colorScheme.lightTheme['off-white'],
    },
    SocialIcon: {
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      width: 30,
      height: 30,
    },
  });
