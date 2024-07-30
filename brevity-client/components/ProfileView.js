import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactModal from './ReactModal';
import ReactNativeModal from 'react-native-modal';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ProfileModal, userInfo, UserProfileInfo} from '../provider/RecoilStore';

const ProfileView = () => {
  const profileInfo = useRecoilValue(userInfo);
  const ModalInfo = useRecoilValue(UserProfileInfo);
  const [profileModal, setProfileModal] = useRecoilState(ProfileModal);

  return (
    <ReactNativeModal
      style={styles.ReactModal}
      isVisible={true}
      onBackdropPress={() => {
        setProfileModal(false);
      }}
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
        <Text style={styles.ProfileName}>{ModalInfo['name'] || 'test'}</Text>
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
          ) : (
            ''
          )}
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
          ) : (
            ''
          )}
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
          ) : (
            ''
          )}
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
          ) : (
            ''
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
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
