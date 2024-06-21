import React from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       {
//         title: 'Gallery Permission',
//         message: 'Brevity needs access to your gallery to select an image.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can access the gallery');
//       // Add logic to open the gallery or image picker here
//     } else {
//       console.log('Gallery permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const EditProfile = () => {
  return (
    <View style={styles.EditProfileView}>
      <StatusBar backgroundColor={'white'} />
      <Text>Update your profile</Text>
      <View style={styles.ProfileDetails}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderWidth: 3,
            borderColor: 'black',
            borderRadius: 50,
            marginBottom: 5,
          }}
          source={require('../../assets/images/icons/user-default-image.png')}
        />
        <Pressable style={styles.UploadBtn}>
          <Image
            style={styles.UploadIcon}
            source={require('../../assets/images/icons/image-upload-icon-bk.png')}
          />
        </Pressable>
      </View>
      <View style={{gap: 13}}>
        <View style={styles.TextInputView}>
          <Text style={styles.InputLabel}>Display Name</Text>
          <TextInput style={styles.TextInput} value="Rakshitha M" />
        </View>
      </View>
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
    marginVertical: 15,
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 50,
    marginBottom: 5,
  },
  UploadBtn: {
    position: 'absolute',
    bottom: 5,
    right: 0,
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
  EditActionBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
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
});
