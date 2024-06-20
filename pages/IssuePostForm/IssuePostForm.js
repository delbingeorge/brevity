import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colorScheme from '../../assets/colors/colorScheme';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';

const IssuePostForm = () => {
  const navigation = useNavigation();
  return (
    // <Modal>
    <View style={styles.FormMainView}>
      <StatusBar backgroundColor={'white'} />
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
          // value="Simple API Calls with Node.js and Express"
          placeholderTextColor={'#c0c0c0'}
        />
        <TextInput
          multiline={true}
          maxLength={1200}
          placeholderTextColor={'#c0c0c0'}
          placeholder="Describe your issue here."
          // value={
          //   "Im just getting started with Node, APIs, and web applications. I understand the basic workings of Node.js and Express, but now I want to start making calls to other service's APIs and to do stuff with their data. Can you outline basic HTTP requests and how to grab/parse the responses in Node?"
          // }
          style={styles.IssueContent}></TextInput>
      </ScrollView>
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
    </View>
    // </Modal>
  );
};

export default IssuePostForm;

const styles = StyleSheet.create({
  FormMainView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    // paddingBottom: 15,
  },
  CloseIcon: {
    width: 18,
    height: 18,
    marginVertical: 8,
    objectFit: 'contain',
  },
  IssueTitle: {
    // marginTop: 10,
    lineHeight: 25,
    // fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: 'black',
    fontSize: 19,
    // borderBottomWidth: 1.2,
    borderBottomColor: '#c0c0c0',
  },
  IssueContent: {
    // marginTop: 5,
    // flex: 1,
    height: 'auto',
    lineHeight: 25,
    marginTop: -10,
    color: 'black',
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
