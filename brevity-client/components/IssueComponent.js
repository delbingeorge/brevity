import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const IssueComponent = () => {
  const [isPressed, setIsPressed] = useState(false);

  const defaultImage = require('../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const pressedImage = require('../assets/images/icons/issue-actions/unsolved-issue-icon.png');

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.IssueComponent}>
      <View style={styles.IssueHeader}>
        <Pressable
          onPress={() => {
            console.log('Pressed View Profile in Issue component');
          }}
          style={styles.IssueUserProfileModal}>
          <Image
            style={styles.HeaderImage}
            source={require('../assets/images/icons/user-default-image.png')}
          />
          <Text style={styles.HeaderUserName}>Verona Josephs</Text>
        </Pressable>
        <Text style={styles.HeaderDivider}> · </Text>
        <Pressable
          onPress={() => {
            console.log('Pressed List Button in Issue Component');
          }}>
          <Text style={styles.HeaderListName}>Javascript</Text>
        </Pressable>
      </View>
      <View style={styles.IssueContent}>
        <Text style={styles.IssueTitle}>
          Simple API Calls with Node.js and Express.
        </Text>
        {/* <View style={{rowGap:8}}> */}
        <Text style={styles.IssueText}>
          I'm just getting started with Node, APIs, and web applications. I
          understand the basic workings of Node.js and Express, but now I want
          to start making calls to other service's APIs and to do stuff with
          their data.
        </Text>
        <Text style={styles.IssueText}>
          Can you outline basic HTTP requests and how to grab/parse the
          responses in Node? I'm also interested in adding specific headers to
          my request (initially I'm using the http://www.getharvest.com API to
          crunch my timesheet data).
        </Text>
        {/* </View> */}
      </View>
      <View style={styles.IssueActionView}>
        <View style={styles.IssueAction}>
          <Pressable onPress={handlePress}>
            <Image
              style={styles.IssueActionIcon}
              source={isPressed ? pressedImage : defaultImage}
            />
          </Pressable>
          <Text style={styles.IssueActionCount}>12k</Text>
        </View>
        <View style={styles.IssueAction}>
          <Image
            style={styles.IssueActionIcon}
            source={require('../assets/images/icons/issue-actions/issue-solution-icon.png')}
          />
          <Text style={styles.IssueActionCount}>15</Text>
        </View>
        <View style={styles.IssueAction}>
          <Image
            style={styles.IssueActionIcon}
            source={require('../assets/images/icons/issue-actions/issue-reach-icon.png')}
          />
          <Text style={styles.IssueActionCount}>109</Text>
        </View>
        <View style={styles.IssueAction}>
          <Image
            style={styles.IssueActionIcon}
            source={require('../assets/images/icons/issue-actions/issue-share-icon.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default IssueComponent;

const styles = StyleSheet.create({
  IssueComponent: {
    borderBottomColor: '#D9D9D9',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    // paddingVertical: 10,
    marginBottom: 15,
    // marginVertical: 8,
    paddingHorizontal: 15,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  HeaderUserName: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  HeaderDivider: {
    fontSize: 27,
    color: '#687684',
  },
  HeaderListName: {
    fontSize: 15,
    color: '#687684',
  },

  IssueUserProfileModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Issue Content Styling
  IssueContent: {rowGap: 5},
  IssueTitle: {color: 'black', fontSize: 18, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 17, lineHeight: 24},

  // Issue Action Styling

  IssueActionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IssueAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 20, height: 20},
  IssueActionCount: {color: 'black', fontSize: 16, fontFamily: 'Inter-Medium'},
  AuthView: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  AuthInnerView: {
    marginTop: 15,
  },
  AuthTitle: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
  },
  AuthSubTitle: {
    color: '#39404A',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  AuthServiceLogo: {
    width: 26,
    height: 26,
    objectFit: 'contain',
  },
  AuthBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    gap: 8,
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  AuthBtnText: {color: 'black', fontSize: 19, fontFamily: 'Inter-Medium'},
  SubText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    marginTop: 15,
    textAlign: 'center',
  },
  ReactModal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
