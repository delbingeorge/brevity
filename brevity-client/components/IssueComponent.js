// Module imports
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {
  authState,
  getTheme,
  listMembershipStatus,
  ProfileModal,
  userInfo,
  UserProfileInfo,
} from '../provider/RecoilStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as Burnt from 'burnt';
import ReactNativeModal from 'react-native-modal';
import colorScheme from '../assets/colors/colorScheme';

const IssueComponent = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [solution, setSolution] = useState('');
  const profileInfo = useRecoilValue(userInfo);
  const [postedSolutions, setPostedSolutions] = useState([]);
  const isListMember = useRecoilValue(listMembershipStatus);
  const [showSolutions, setShowSolutions] = useState(false);
  const authValue = useRecoilValue(authState);
  const theme = useRecoilValue(getTheme);

  const styles = createStyle(theme);

  const URL = Config.BASE_URL;
  const {
    params: {item},
  } = useRoute();

  useEffect(() => {
    resSolution();
  }, [item.issueId, solution]);

  const [isModalVisible, setModalVisible] = useRecoilState(ProfileModal);
  const [modalInfo, setModalInfo] = useRecoilState(UserProfileInfo);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const handClick = () => {
    if (solution.length > 0) {
      PostSolution();
    }
  };

  const PostSolution = async () => {
    try {
      const response = await axios.post(`${URL}/api/post-response`, {
        issueId: item.issueId,
        userId: profileInfo.id,
        content: solution.trim(),
      });
      if (response.status == 200) {
        setSolution('');
        Burnt.toast({
          title: 'Solution posted!',
        });
      } else {
        Burnt.toast({
          title: 'Failed to post solution.',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      }
    } catch (error) {
      Burnt.toast({
        title: 'Oops! Something went wrong white posting solution.',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  const resSolution = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/get-issue-solutions/${item.issueId}`,
      );
      if (response.status === 200) {
        setPostedSolutions(response.data['response']);
      } else {
        Burnt.toast({
          title: 'Fetching solutions failed!',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      }
    } catch (error) {
      Burnt.toast({
        title: 'Error while fetching!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  const SolutionHeader = () => {
    return postedSolutions.length > 0 ? (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color:
              theme === 'dark'
                ? colorScheme.darkTheme['light']
                : colorScheme.lightTheme.dark,
            fontFamily: 'Inter-Medium',
            fontSize: 16,
          }}>
          Solution thread
        </Text>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            paddingHorizontal: 7,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              fontFamily: 'Inter-Medium',
            }}>
            {postedSolutions.length}
          </Text>
        </View>
      </View>
    ) : null;
  };

  const renderSolutionItem = ({item}) => {
    return (
      <View key={item.solutionId} style={styles.IssueComponent}>
        <View style={styles.IssueHeader}>
          <Pressable style={styles.IssueUserProfileModal}>
            <Image style={styles.HeaderImage} source={{uri: item.photo}} />
            <Text style={styles.HeaderUserName}>{item.name}</Text>
          </Pressable>
          <Text style={styles.HeaderDivider}> · </Text>
          <Pressable>
            <Text style={styles.HeaderListName}>{'🎉'}</Text>
          </Pressable>
        </View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueText}>{item.body}</Text>
        </View>
        <View style={styles.IssueActionView}>
          <View
            style={[
              styles.IssueAction,
              {
                backgroundColor:
                  theme === 'dark'
                    ? colorScheme.darkTheme['pitch-grey']
                    : 'rgba(0,0,0,0.05)',
                borderWidth: 0.5,
                borderColor: theme === 'dark' ? '#303030' : 'rgba(0,0,0,0)',
              },
            ]}>
            <Pressable onPress={handlePress}>
              <Image
                style={styles.IssueActionIcon}
                source={require('../assets/images/icons/issue-actions/issue-upvote.png')}
              />
            </Pressable>
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
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
      <ScrollView style={styles.IssueComponent}>
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
        <View style={[styles.IssueActionView, {paddingBottom: 80}]}>
          <View
            style={[
              styles.IssueAction,
              {
                backgroundColor:
                  theme === 'dark'
                    ? colorScheme.darkTheme['pitch-grey']
                    : 'rgba(0,0,0,0.05)',
                borderWidth: 0.5,
                borderColor: theme === 'dark' ? '#303030' : 'rgba(0,0,0,0)',
              },
            ]}>
            <Pressable onPress={handlePress}>
              <Image
                style={styles.IssueActionIcon}
                source={require('../assets/images/icons/issue-actions/issue-upvote.png')}
              />
            </Pressable>
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <Pressable
            onPress={() => postedSolutions.length > 0 && setShowSolutions(true)}
            style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../assets/images/icons/issue-actions/issue-solution-icon.png')}
            />
            <Text style={styles.IssueActionCount}>
              {postedSolutions.length}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ReactNativeModal
        style={styles.ReactModal}
        isVisible={showSolutions}
        onBackdropPress={() => setShowSolutions(false)}>
        <View style={styles.AuthView}>
          <FlatList
            ItemSeparatorComponent={
              <View
                style={{
                  backgroundColor:
                    theme === 'dark'
                      ? colorScheme.lightTheme['text-color']
                      : colorScheme.lightTheme['pitch-grey'],
                  marginVertical: 10,
                  height: 0.5,
                  opacity: 0.2,
                  width: '100%',
                }}></View>
            }
            ListHeaderComponent={<SolutionHeader />}
            data={postedSolutions}
            renderItem={renderSolutionItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        </View>
      </ReactNativeModal>
      {authValue && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              theme === 'dark'
                ? colorScheme.darkTheme['primary-dark']
                : colorScheme.lightTheme['primary-light'],
          }}>
          {/* <Text style={{color: 'black'}}>Words 100/4000</Text> */}
          <View style={styles.SearchInput}>
            <TextInput
              placeholder="Post your solution"
              value={solution}
              placeholderTextColor={
                theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'
              }
              maxLength={2500}
              multiline={true}
              style={{
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                color: theme === 'dark' ? 'white' : 'rgba(0,0,0,0.4)',
                width: '85%',
              }}
              onChangeText={value => {
                setSolution(value);
              }}
            />
            <Pressable
              onPress={handClick}
              style={{
                backgroundColor:
                  theme === 'dark'
                    ? colorScheme.darkTheme['primary-dark']
                    : colorScheme.lightTheme['primary-light'],
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
      )}
    </View>
  );
};

export default IssueComponent;

const createStyle = theme =>
  StyleSheet.create({
    IssueComponent: {
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
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
      color: theme === 'dark' ? '#E6E6E6' : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-Medium',
      fontSize: 14,
    },
    HeaderDivider: {
      fontSize: 20,
      color: '#687684',
    },
    HeaderListName: {
      fontSize: 13.5,
      color: theme === 'dark' ? '#757575' : colorScheme.lightTheme.dark,
    },

    IssueUserProfileModal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Issue Content Styling
    IssueContent: {rowGap: 5},
    IssueTitle: {
      color: theme === 'dark' ? '#EBEBEB' : colorScheme.lightTheme.dark,
      fontSize: 16.3,
      fontFamily: 'Inter-Medium',
    },
    IssueText: {
      color: theme === 'dark' ? '#CECECE' : '#687684',
      fontSize: 16,
      lineHeight: 22,
    },

    // Issue Action Styling

    IssueActionView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 25,
      justifyContent: 'flex-start',
    },
    IssueAction: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 5,
      borderRadius: 50,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginTop: 8,
      marginBottom: 5,
    },
    IssueActionIcon: {
      width: 17,
      height: 17,
      objectFit: 'contain',
      tintColor: theme === 'dark' ? 'white' : colorScheme.lightTheme.dark,
    },
    IssueActionCount: {
      fontSize: 13.5,
      fontFamily: 'Inter-Medium',
      color: theme === 'dark' ? 'white' : colorScheme.lightTheme.dark,
    },
    AuthView: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 5,
      paddingVertical: 10,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      maxHeight: Dimensions.get('screen').height - 100,
      width: '100%',
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
      position: 'absolute',
      bottom: 0,
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    GoBack: {
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      display: 'flex',
      flexDirection: 'row',
      gap: 13,
      paddingHorizontal: 15,
      paddingBottom: 5,
      marginBottom: -5,
      borderBottomWidth: 2.5,
      borderColor: 'rgba(255,255,255,0.8)',
    },
    GoBackIcon: {
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.darkTheme.dark,
      width: 25,
      height: 25,
    },
    SearchInput: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:
        theme === 'dark' ? colorScheme.darkTheme['pitch-grey'] : '#f8f8f8',
      borderRadius: 6,
      marginVertical: 12,
      fontFamily: 'Inter-Medium',
      paddingHorizontal: 5,
      marginHorizontal: 15,
      paddingVertical: 3,
    },
  });
