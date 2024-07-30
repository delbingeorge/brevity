import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {ProfileModal, UserProfileInfo} from '../provider/RecoilStore';
import {useRecoilState} from 'recoil';

const IssueComponent = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [solution, setSolution] = useState('');
  const {
    params: {item},
  } = useRoute();
  const URL = Config.BASE_URL;
  const [isModalVisible, setModalVisible] = useRecoilState(ProfileModal);
  const [modalInfo, setModalInfo] = useRecoilState(UserProfileInfo);

  const defaultImage = require('../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const pressedImage = require('../assets/images/icons/issue-actions/unsolved-issue-icon.png');
  const solutionImage = require('../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const solutionPressedImage = require('../assets/images/icons/issue-actions/solved-issue-default-icon.png');

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const PostSolution = async () => {
    try {
      const response = await axios.post(`${URL}/api/post-solution`, {
        issueId: item.id,
        content: solution.trim(),
      });
      if (response.status == 200) {
        console.log(response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../assets/images/icons/go-back-bk.png')}
        />
      </Pressable>
      <View style={styles.IssueComponent}>
        <View style={styles.IssueHeader}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              setModalInfo(item);
            }}
            style={styles.IssueUserProfileModal}>
            <Image style={styles.HeaderImage} source={{uri: item.photo}} />
            <Text style={styles.HeaderUserName}>{item.name}</Text>
          </Pressable>
          <Text style={styles.HeaderDivider}> · </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('ListHomePage', {item});
            }}>
            <Text style={styles.HeaderListName}>{item.list_name}</Text>
          </Pressable>
        </View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueTitle}>{item.title}</Text>
          <Text style={styles.IssueText}>{item.body}</Text>
        </View>
        <View style={styles.IssueActionView}>
          <View style={styles.IssueAction}>
            <Pressable onPress={handlePress}>
              <Image
                style={styles.IssueActionIcon}
                source={isPressed ? pressedImage : defaultImage}
              />
            </Pressable>
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../assets/images/icons/issue-actions/issue-solution-icon.png')}
            />
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../assets/images/icons/issue-actions/issue-reach-icon.png')}
            />
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../assets/images/icons/issue-actions/issue-share-icon.png')}
            />
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
        <Text
          style={{color: 'black', fontFamily: 'Inter-Medium', fontSize: 16}}>
          Solution thread
        </Text>
      </View>

      <View style={styles.IssueComponent}>
        <View style={styles.IssueHeader}>
          <Pressable
            onPress={() => {
              console.log('Pressed View Profile in Issue component');
            }}
            style={styles.IssueUserProfileModal}>
            <Image style={styles.HeaderImage} source={{uri: item.photo}} />
            <Text style={styles.HeaderUserName}>{item.name}</Text>
          </Pressable>
          <Text style={styles.HeaderDivider}> · </Text>
          <Pressable
            onPress={() => {
              console.log('Pressed List Button in Issue Component');
            }}>
            <Text style={styles.HeaderListName}>{'🎉'}</Text>
          </Pressable>
        </View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueTitle}>{item.title}</Text>
          <Text style={styles.IssueText}>{'Lorem ipsum dolor set amit'}</Text>
        </View>
        <View style={styles.IssueActionView}>
          <View style={styles.IssueAction}>
            <Pressable onPress={handlePress}>
              <Image
                style={styles.IssueActionIcon}
                source={isPressed ? pressedImage : defaultImage}
              />
            </Pressable>
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        {/* <Text style={{color: 'black'}}>Words 100/4000</Text> */}
        <View style={styles.SearchInput}>
          <TextInput
            placeholder="Post your solution"
            placeholderTextColor={'rgba(0,0,0,0.3)'}
            maxLength={2500}
            multiline={true}
            style={{
              fontSize: 15,
              fontFamily: 'Inter-Medium',
              color: 'black',
              width: '85%',
            }}
            onChangeText={value => {
              setSolution(value);
            }}
          />
          <Pressable
            onPress={PostSolution}
            style={{
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: 8,
              borderRadius: 8,
            }}>
            <Image
              style={[styles.IssueActionIcon, {width: 25, height: 25}]}
              source={require('../assets/images/icons/issue-post-bk-icon.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default IssueComponent;

const styles = StyleSheet.create({
  IssueComponent: {
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: 20,
    height: 20,
    // width: 25,
    // height: 25,
    borderRadius: 100,
    marginRight: 7,
  },
  HeaderUserName: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    // fontSize: 16,
    fontSize: 14,
  },
  HeaderDivider: {
    fontSize: 20,
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
  IssueTitle: {color: 'black', fontSize: 16.3, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 16, lineHeight: 22},

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
    columnGap: 5,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 17, height: 17, objectFit: 'contain'},
  IssueActionCount: {
    color: 'black',
    fontSize: 13.5,
    fontFamily: 'Inter-Medium',
  },
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
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  GoBackIcon: {
    width: 25,
    height: 25,
  },
  SearchInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    marginVertical: 8,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 5,
    marginHorizontal: 15,
  },
});
