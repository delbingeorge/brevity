import React, {useState} from 'react';
import {
  Dimensions,
  Image,
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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import * as Burnt from 'burnt';

const EditProfile = () => {
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [profileImage, setProfileImage] = useState(profileInfo.photo);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    profilePhoto: profileImage,
    fullName: profileInfo.name,
    userName: profileInfo.username,
    profileBio: profileInfo.bio,
    mailAddress: profileInfo.email,
    linkFirst: profileInfo.linkFirst,
    linkSecond: profileInfo.linkSecond,
    linkThird: profileInfo.linkThird,
    linkForth: profileInfo.linkForth,
  });

  const imagePicker = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setProfileImage(selectedImage);
        setFormData(prevState => ({
          ...prevState,
          profilePhoto: response.assets,
        }));
      }
    });
  };

  const formHandler = async () => {
    try {
      const updatedProfile = {
        ...profileInfo,
        photo: formData.profilePhoto,
        name: formData.fullName,
        username: formData.userName,
        email: formData.mailAddress,
        bio: formData.profileBio,
        linkFirst: formData.linkFirst,
        linkSecond: formData.linkSecond,
        linkThird: formData.linkThird,
        linkForth: formData.linkForth,
      };

      const response = await axios.post(
        'http://192.168.1.105:8000/api/profile/update',
        updatedProfile,
      );

      if (response.status == 200) {
        navigation.navigate('ProfilePage');
        Burnt.toast({
          title: 'Profile Updated!',
        });
      } else {
        navigation.navigate('ProfilePage');
        Burnt.toast({
          title: response.statusText,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.EditProfileView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ProfileDetails}>
          <Image style={styles.ProfileImage} source={{uri: profileImage}} />
          <TouchableOpacity style={styles.UploadBtn} onPress={imagePicker}>
            <Image
              style={styles.UploadIcon}
              source={require('../../assets/images/icons/image-upload-icon-bk.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{gap: 8, marginBottom: 80}}>
          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Display Name</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.name}
              value={formData.fullName}
              onChangeText={value => handleInputChange('fullName', value)}
            />
          </View>

          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Bio</Text>
            <TextInput
              style={styles.TextInput}
              maxLength={30}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.profileBio}
              value={formData.profileBio}
              onChangeText={value => handleInputChange('profileBio', value)}
            />
          </View>

          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Username</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.username}
              // value={formData.userName}
              editable={false}
            />
          </View>

          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Mail Address</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              placeholder={profileInfo.email}
              // value={formData.mailAddress}
              editable={false}
            />
          </View>

          <View style={styles.TextInputView}>
            <Text style={styles.InputLabel}>Social</Text>
            <View style={styles.SocialInputView}>
              <TextInput
                style={styles.SocialTextInput}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder={profileInfo.linkFirst}
                value={formData.linkFirst}
                onChangeText={value => handleInputChange('linkFirst', value)}
              />
              <TextInput
                style={styles.SocialTextInput}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder={profileInfo.linkSecond}
                value={formData.linkSecond}
                onChangeText={value => handleInputChange('linkSecond', value)}
              />
              <TextInput
                style={styles.SocialTextInput}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder={profileInfo.linkThird}
                value={formData.linkThird}
                onChangeText={value => handleInputChange('linkThird', value)}
              />
              <TextInput
                style={styles.SocialTextInput}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder={profileInfo.linkForth}
                value={formData.linkForth}
                onChangeText={value => handleInputChange('linkForth', value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.EditActionBtn}>
        <TouchableOpacity style={styles.ActionBtn} onPress={formHandler}>
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
    marginVertical: 10,
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
    width: '100%',
    height: 50,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f6f6f6',
    paddingLeft: 10,
    fontFamily: 'Inter-Medium',
    borderRadius: 5,
    flexGrow: 1,
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
    paddingVertical: 16,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    rowGap: 10,
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
