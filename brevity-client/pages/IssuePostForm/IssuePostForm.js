import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colorScheme from '../../assets/colors/colorScheme';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getTheme, userInfo} from '../../provider/RecoilStore';
import ReactNativeModal from 'react-native-modal';
import Config from 'react-native-config';
import * as Burnt from 'burnt';

const IssuePostForm = () => {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listModalView, setListModalView] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const theme = useRecoilValue(getTheme);
  const styles = createStyle(theme);

  const URL = Config.BASE_URL;

  const getListArray = async () => {
    try {
      const response = await axios.post(`${URL}/api/get-all-lists`, {
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setItems(response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      Burnt.toast({
        title: 'Something went wrong! 1',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  useEffect(() => {
    getListArray();
  }, []);

  const [issueContent, setIssueContent] = useState({
    issuerUserID: profileInfo.id,
    issuerMail: profileInfo.email,
    issueTitle: '',
    issueBody: '',
    listID: '',
  });

  const inputHandler = (name, value) => {
    setIssueContent({
      ...issueContent,
      [name]: value,
    });
  };

  const issueHandler = async () => {
    if (
      !issueContent.listID ||
      !issueContent.issueTitle ||
      !issueContent.issueBody
    ) {
      Burnt.alert({
        title: 'All fields are required!',
      });
      return;
    }
    try {
      console.log('Attempting to post issue:', issueContent);
      console.log('API URL:', `${URL}/api/post-issue`);

      const response = await axios.post(`${URL}/api/post-issue`, issueContent);
      if (response.status == 201) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error posting issue:', error.response || error);
      Burnt.toast({
        title: 'Something went wrong! 2',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  return (
    <View style={styles.FormMainView}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.CloseIcon}
            source={require('../../assets/images/icons/close-cross-icon-bk.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TextInput
          multiline={true}
          style={styles.IssueTitle}
          placeholder="Issue title in short"
          maxLength={100}
          onChangeText={value => {
            inputHandler('issueTitle', value.trim().replace(/\s+/g, ' '));
          }}
          placeholderTextColor={'#c0c0c0'}
        />
        <TextInput
          multiline={true}
          maxLength={3000}
          placeholderTextColor={'#c0c0c0'}
          placeholder="Describe your issue here."
          onChangeText={value => {
            inputHandler('issueBody', value);
          }}
          style={styles.IssueContent}
        />
      </ScrollView>

      <View style={styles.ActionButtonView}>
        <View style={{marginVertical: 1}}>
          <Pressable
            onPress={() => {
              setListModalView(true);
            }}
            style={{
              // borderWidth: 2,
              // borderColor: '#dfdfdf',
              backdropColor: 'white',
              width: 150,
              borderRadius: 10,
              // paddingLeft: 12,
            }}>
            <Text
              style={{
                borderWidth: 1.5,
                paddingVertical: 7,
                paddingLeft: 10,
                textAlign: 'left',
                borderRadius: 8,
                fontFamily: 'Inter-Medium',
                color:
                  theme === 'dark'
                    ? colorScheme.darkTheme.light
                    : colorScheme.lightTheme.dark,
                borderColor:
                  theme === 'dark'
                    ? colorScheme.darkTheme['pitch-grey']
                    : colorScheme.lightTheme['off-white'],
              }}>
              {value ? value : 'Select List'}
            </Text>
          </Pressable>
        </View>
        {/* <View style={styles.ButtonView}>
          <TouchableOpacity>
            <Image
              style={styles.ActionButtonIcon}
              source={require('../../assets/images/icons/image-icon-bk.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.ActionButtonIcon}
              source={require('../../assets/images/icons/code-icon-bk.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.ActionButtonIcon}
              source={require('../../assets/images/icons/link-icon-bk.png')}
            />
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity
          onPress={issueHandler}
          style={{
            backgroundColor: colorScheme.brandColors.blue,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            paddingVertical: 8,
            borderRadius: 6,
            width: 90,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: colorScheme.darkTheme.light,
              fontWeight: '500',
            }}>
            Raise
          </Text>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/images/icons/add-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        style={styles.ReactModal}
        animationIn={'slideInUp'}
        backdropColor="black"
        onBackdropPress={() => {
          setListModalView(false);
        }}
        isVisible={listModalView}>
        <View style={styles.AuthView}>
          {items.map(value => {
            return (
              <Pressable
                onPress={() => {
                  // inputHandler('listName', value.list_name);
                  inputHandler('listID', value.id);
                  setValue(value.list_name);
                  // setValue(value.id);
                  setListModalView(false);
                }}
                key={value.id}>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 15,
                    color:
                      theme === 'dark'
                        ? colorScheme.darkTheme.light
                        : colorScheme.lightTheme.dark,
                    fontFamily: 'Inter-Medium',
                  }}>
                  {value.list_name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default IssuePostForm;

const createStyle = theme =>
  StyleSheet.create({
    ReactModal: {
      margin: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    AuthView: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 20,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      width: Dimensions.get('screen').width,
    },
    FormMainView: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
    },
    CloseIcon: {
      width: 16,
      height: 16,
      marginVertical: 8,
      objectFit: 'contain',
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme['light']
          : colorScheme.lightTheme['dark'],
    },
    IssueTitle: {
      lineHeight: 25,
      fontFamily: 'Inter-Medium',
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontSize: 19,
      borderBottomColor: '#c0c0c0',
    },
    IssueContent: {
      flex: 1,
      lineHeight: 25,
      marginTop: -10,
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
    },
    ActionButtonView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    ButtonView: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
    },
    ActionButtonIcon: {
      width: 24,
      height: 24,
    },
  });
