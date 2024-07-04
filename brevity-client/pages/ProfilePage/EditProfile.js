import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {userInfo} from '../../provider/RecoilStore';
import {useRecoilState} from 'recoil';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = () => {
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const username = profileInfo.name.toLowerCase().replaceAll(' ', '');
  const [profileImage, setProfileImage] = useState(profileInfo.photo);

  const [formData, setFormData] = useState({
    fullName: profileInfo.name,
    userName: username,
    profileBio: '',
    mailAddress: profileInfo.email,
    socialLinks: ['', '', '', '', ''],
  });

  const imagePicker = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('user cancelled');
      } else if (response.errorCode) {
        console.log('Image picker error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setProfileImage(selectedImage);
      }
    });
  };


  return (
    <View style={styles.EditProfileView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ProfileDetails}>
          <Image style={styles.ProfileImage} source={{uri: profileImage}} />
          <Pressable style={styles.UploadBtn} onPress={imagePicker}>
            <Image
              style={styles.UploadIcon}
              source={require('../../assets/images/icons/image-upload-icon-bk.png')}
            />
          </Pressable>
        </View>
        <View style={{gap: 8, marginBottom: 80}}>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Display Name</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.name}
            />
          </View>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Username</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={username}
            />
          </View>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Bio</Text>
            <TextInput
              style={styles.TextInput}
              maxLength={30}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder="I love to code."
            />
          </View>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Mail Address</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.email}
            />
          </View>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Social</Text>
            <View style={styles.SocialInputView}>
              <TextInput
                style={styles.SocialTextInput}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder="veronajosephs@proton.me"
              />
              <Pressable style={styles.NewSocialAdd}>
                <Image
                  style={{width: 28, height: 28, tintColor: 'black'}}
                  source={require('../../assets/images/icons/add-icon.png')}
                />
              </Pressable>
            </View>
            {/* <Text style={{color: 'red', fontSize: 13}}>Enter a valid URL.</Text> */}
            <View style={styles.SocialView}>
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL('https://www.delb.in');
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/github-icon.png')}
                />
              </Pressable>
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL('https://www.delb.in');
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/linkedin-icon.png')}
                />
              </Pressable>
              <Pressable
                style={styles.SocialButton}
                onPress={() => {
                  Linking.openURL('https://www.delb.in');
                }}>
                <Image
                  style={styles.SocialIcon}
                  source={require('../../assets/images/icons/socials/youtube-icon.png')}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.EditActionBtn}>
        {/* <TouchableOpacity style={styles.ActionBtnDiscard}>
          <Text style={styles.BtnText}>Discard</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.ActionBtn}>
          <Text style={styles.BtnText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  EditProfileView: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  ProfileDetails: {
    marginVertical: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileImage: {
    width: 110,
    height: 110,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 100,
    marginBottom: 5,
  },
  UploadBtn: {
    position: 'absolute',
    bottom: 6,
    right: '35%',
    padding: 6,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  UploadIcon: {width: 15, height: 15, objectFit: 'contain'},
  TextInputView: {
    // paddingHorizontal: 20,
    width: Dimensions.get('screen').width - 30,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
  },
  InputLabel: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  TextInput: {
    width: '100%',
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f6f6f6',
    paddingLeft: 10,
    fontFamily: 'Inter-Medium',
    borderRadius: 5,
  },
  SocialTextInput: {
    width: '82%',
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f6f6f6',
    paddingLeft: 10,
    fontFamily: 'Inter-Medium',
    borderRadius: 5,
  },
  EditActionBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: 'white',
    bottom: 0,
    width: Dimensions.get('screen').width,
    // backgroundColor: 'black',
  },
  ActionBtnDiscard: {
    // width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,25,0,1)',
  },
  ActionBtn: {
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  BtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  SocialInputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  NewSocialAdd: {
    backgroundColor: '#f6f6f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '15%',
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
