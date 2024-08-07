import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import ListFeedPage from './ListNavigation/ListFeedPage/ListFeedPage';
// import ListInsights from './ListNavigation/ListInsights/ListInsights';
// import ListRanking from './ListNavigation/ListRanking/ListRanking';
import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  authState,
  listMembershipStatus,
  modalView,
  ProfileModal,
  userInfo,
  UserProfileInfo,
} from '../../provider/RecoilStore';
import Config from 'react-native-config';
import ReactModal from '../../components/Authentication';
import * as Burnt from 'burnt';

const ListHomePage = () => {
  const URL = Config.BASE_URL;
  const [renderComponent, setRenderComponent] = useState('ListFeedPage');
  const {
    params: {item},
  } = useRoute();

  const navigation = useNavigation();
  const [listJoin, setListJoin] = useState(false);
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [listJoinStatus, setListJoinStatus] =
    useRecoilState(listMembershipStatus);
  const [loading, setLoading] = useState(false);
  const [listArray, setListArray] = useState([]);
  const [listDetails, setListDetails] = useState([]);
  const [listIssues, setListIssues] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const authValue = useRecoilValue(authState);
  const [isModalVisible, setModalVisible] = useRecoilState(ProfileModal);
  const [modalInfo, setModalInfo] = useRecoilState(UserProfileInfo);

  useEffect(() => {
    getListIssues();
    getListArray();
    getListDetails();
  }, [listJoin]);

  const defaultImage = require('../../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const pressedImage = require('../../assets/images/icons/issue-actions/unsolved-issue-icon.png');

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const getListIssues = async () => {
    try {
      const response = await axios.get(`${URL}/api/get-list-issues/${item.id}`);
      if (response.status === 200) {
        setListIssues(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
       Burnt.toast({
        title: 'Something went wrong!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  const getListArray = async () => {
    try {
      const response = await axios.post(`${URL}/api/get-all-lists`, {
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListArray(response.data);
        setListJoinStatus(!listJoinStatus);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
       Burnt.toast({
        title: 'Something went wrong!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
  };

  const getListDetails = async () => {
    try {
      const response = await axios.get(`${URL}/api/lists-details/${item.id}`);
      if (response.status == 200) {
        setListDetails(response.data);
      } else {
        Burnt.toast({
          title: response.statusText,
          preset: 'error',
          haptic: 'warning',
          duration: 5,
          from: 'top',
        });
      }
    } catch (error) {
      Burnt.toast({
        title: error,
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'top',
      });
    }
  };

  const isItemInListArray = listArray.some(listItem => listItem.id === item.id);

  const ListJoinLogic = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/join-list`, {
        list_id: item.id,
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListJoin(!listJoin);
        setListJoinStatus(!listJoinStatus);
      }
    } catch (error) {
      Burnt.toast({
        title: error,
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const ListLeaveLogic = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/leave-list`, {
        list_id: item.id,
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListJoin(!listJoin);
      }
    } catch (error) {
      Burnt.toast({
        title: error,
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  // const renderViewLogic = () => {
  //   switch (renderComponent) {
  //     case 'ListFeedPage':
  //       return <ListFeedPage />;
  //     case 'ListRankings':
  //       return <ListRanking />;
  //     case 'ListInsights':
  //       return <ListInsights />;
  //     default:
  //       return <ListFeedPage />;
  //   }
  // };

  const renderItem = ({item, index}) => {
    let postDate = new Date(item.created_at);
    const currentDate = new Date();

    const diff = currentDate - postDate;
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    const isLongText = item.body.length > 250;
    const displayText = isLongText ? item.body.substring(0, 200) : item.body;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('IssueComponent', {item});
        }}
        style={styles.IssueComponent}
        key={`${item.id}-${index}`}>
        <View style={styles.IssueHeader}>
          <Pressable
            style={styles.IssueUserProfileModal}
            onPress={() => {
              setModalVisible(true);
              setModalInfo(item);
            }}>
            <Image style={styles.HeaderImage} source={{uri: item.photo}} />
            <Text style={styles.HeaderUserName}>{item.name}</Text>
            <Text style={styles.HeaderDivider}> · </Text>
            <Text style={styles.HeaderListName}>{`${
              daysAgo === 0 ? 'Today' : daysAgo + ' day(s) ago'
            }`}</Text>
          </Pressable>
        </View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueTitle}>{item.title}</Text>
          <Text style={styles.IssueText}>
            {displayText}
            {isLongText && (
              <Text style={styles.ReadMoreText}> ...read more</Text>
            )}
          </Text>
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
              source={require('../../assets/images/icons/issue-actions/issue-solution-icon.png')}
            />
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../../assets/images/icons/issue-actions/issue-reach-icon.png')}
            />
            <Text style={styles.IssueActionCount}>0</Text>
          </View>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../../assets/images/icons/issue-actions/issue-share-icon.png')}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          display: authValue === true && isItemInListArray ? 'flex' : 'none',
          backgroundColor: '#548DFE',
          height: 45,
          width: 45,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 999,
        }}
        onPress={() => navigation.navigate('IssuePostForm')}>
        <Image
          style={{height: 19, width: 19}}
          source={require('../../assets/images/icons/issue-post-plus-icon.png')}
        />
      </TouchableOpacity>
      <ScrollView style={styles.ListHomePageView}>
        <View style={styles.MainView}>
          <View style={styles.ListHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={styles.GoBackIcon}
                  source={require('../../assets/images/icons/go-back-bk.png')}
                />
              </Pressable>
              {/* <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/images/icons/user-default-image1.png')}
              /> */}
              <Text style={styles.ListTitle}>{item.list_name}</Text>
            </View>
          </View>
          <Text style={styles.ListDescription}>{item.description}</Text>
          <View style={styles.HeaderIconView}>
            <View style={styles.ListHeaderIcons}>
              <Image
                style={styles.HeaderIcon}
                source={require('../../assets/images/icons/list-icons/list-member-count.png')}
              />
              <Text style={styles.HeaderIconText}>
                {listDetails.length === 0 ? 0 : listDetails[0].userCount}
              </Text>
            </View>
            <View style={styles.ListHeaderIcons}>
              <Image
                style={styles.HeaderIcon}
                source={require('../../assets/images/icons/list-icons/solved-issue-default-icon.png')}
              />
              <Text style={styles.HeaderIconText}>10k</Text>
            </View>
            <View style={styles.ListHeaderIcons}>
              <Image
                style={styles.HeaderIcon}
                source={require('../../assets/images/icons/list-icons/unsolved-issue-default-icon.png')}
              />
              <Text style={styles.HeaderIconText}>30k</Text>
            </View>
          </View>

          {isItemInListArray === true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable onPress={ListLeaveLogic} style={{width: '49%'}}>
                <Text style={styles.ListLeaveBtn}>
                  {loading ? <ActivityIndicator /> : 'Leave List'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('ScreamPage')}
                style={{
                  backgroundColor: '#f5f7f9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 9,
                  borderRadius: 5,
                  width: '49%',
                }}>
                <Image
                  style={{width: 23, height: 23, objectFit: 'contain'}}
                  source={require('../../assets/images/icons/scream-icon-bk.png')}
                />
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={
                authValue === true
                  ? ListJoinLogic
                  : () => {
                      setShowModalView(true);
                    }
              }>
              <Text style={styles.ListJoinBtn}>
                {loading ? <ActivityIndicator /> : 'Join List'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.ListNav}>
          <Pressable
            onPress={() => setRenderComponent('ListFeedPage')}
            style={
              renderComponent == 'ListFeedPage'
                ? styles.ActiveListNavText
                : styles.ListNavButton
            }>
            <Text style={styles.ListNavText}>Feeds</Text>
          </Pressable>
          <Pressable
            onPress={() => setRenderComponent('ListRankings')}
            style={
              renderComponent == 'ListRankings'
                ? styles.ActiveListNavText
                : styles.ListNavButton
            }>
            <Text style={styles.ListNavText}>Ranking</Text>
          </Pressable>
          <Pressable
            onPress={() => setRenderComponent('ListInsights')}
            style={
              renderComponent == 'ListInsights'
                ? styles.ActiveListNavText
                : styles.ListNavButton
            }>
            <Text style={styles.ListNavText}>Insights</Text>
          </Pressable>
        </View>

        <ScrollView horizontal={true} contentContainerStyle={{width: '100%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listIssues}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
          />
        </ScrollView>

        {showModalView && <ReactModal />}
      </ScrollView>
    </>
  );
};

export default ListHomePage;

const styles = StyleSheet.create({
  ListHomePageView: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingVertical: 4,
    borderBottomWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  ListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  ListTitle: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 22,
  },
  ListSettings: {
    width: 20,
    height: 20,
  },
  ListDescription: {
    color: '#2E3540',
    lineHeight: 22,
    fontSize: 16,
  },
  HeaderIconView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ListHeaderIcons: {flexDirection: 'row', columnGap: 7, alignItems: 'center'},
  HeaderIcon: {width: 18, height: 18},
  HeaderIconText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  ListNav: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  ActiveListNavText: {
    borderRadius: 8,
    backgroundColor: '#f5f7f9',
  },
  ListNavText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    paddingVertical: 6,
    borderRadius: 8,
    paddingHorizontal: 25,
    fontSize: 14,
    borderColor: '#F5F7F9',
    borderWidth: 1,
    textAlign: 'center',
  },
  GoBackIcon: {
    width: 25,
    height: 25,
  },
  GoBackText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: 'black',
  },
  ListJoinBtn: {
    backgroundColor: 'black',
    paddingVertical: 9,
    borderRadius: 8,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  ListLeaveBtn: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 9,
    // paddingHorizontal: 5,
    borderRadius: 8,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  IssueComponent: {
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    marginBottom: 10,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
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
    fontSize: 13.5,
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
  ReadMoreText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
});
