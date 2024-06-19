import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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
        <Text style={styles.IssueTitle}>
          Simple API Calls with Node.js and Express
        </Text>
        <Text style={styles.IssueContent}>
          I'm just getting started with Node, APIs, and web applications. I
          understand the basic workings of Node.js and Express, but now I want
          to start making calls to other service's APIs and to do stuff with
          their data. Can you outline basic HTTP requests and how to grab/parse
          the responses in Node? I'm also interested in adding specific headers
          to my request.
        </Text>
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
            // paddingHorizontal: 15,
            width: 90,
            // paddingVertical: 8,
            // paddingHorizontal: 12,
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
    height: Dimensions.get('screen').height,
    // paddingHorizontal: 20,
    paddingTop: 5,
  },
  CloseIcon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  IssueTitle: {
    marginTop: 10,
    fontWeight: '500',
    // fontFamily: 'Inter-semibold',
    color: 'black',
    fontSize: 19,
  },
  IssueContent: {
    marginTop: 5,
    lineHeight: 25,
    color: 'black',
    fontSize: 16,
  },
  ActionButtonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ButtonView: {display: 'flex', flexDirection: 'row', gap: 8},
  ActionButtonIcon: {
    width: 24,
    height: 24,
  },
});
