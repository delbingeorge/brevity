import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colorScheme from '../../assets/colors/colorScheme';
import {useNavigation} from '@react-navigation/native';

const IssuePostForm = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.FormMainView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
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

      <View>
        <TextInput
          multiline={true}
          style={styles.IssueTitle}
          placeholder="Issue title in short"
          placeholderTextColor={'#c0c0c0'}
        />
        <TextInput
          multiline={true}
          placeholderTextColor={'#c0c0c0'}
          placeholder="Describe your issue here."
          style={styles.IssueContent}></TextInput>
      </View>

      <View style={styles.ActionButtonView}>
        <View style={styles.ButtonView}>
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
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colorScheme['primary-color'],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            paddingVertical: 8,
            borderRadius: 6,
            width: 90,
          }}>
          <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
            Post
          </Text>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/images/icons/add-icon.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IssuePostForm;

const styles = StyleSheet.create({
  FormMainView: {
    backgroundColor: 'white',
    paddingTop: 5,
  },
  CloseIcon: {
    width: 18,
    height: 18,
    objectFit: 'contain',
  },
  IssueTitle: {
    // marginTop: 10,
    lineHeight: 25,
    // fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: 19,
    // borderBottomWidth: 1.2,
    borderBottomColor: '#c0c0c0',
  },
  IssueContent: {
    // marginTop: 5,
    lineHeight: 25,
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  ActionButtonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
