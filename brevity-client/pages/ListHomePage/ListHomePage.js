import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ListFeedPage from './ListNavigation/ListFeedPage/ListFeedPage';
import ListInsights from './ListNavigation/ListInsights/ListInsights';
import ListRanking from './ListNavigation/ListRanking/ListRanking';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {
  listMembershipStatus,
  userInfo,
  UserLists,
} from '../../provider/RecoilStore';
import Config from 'react-native-config';

const ListHomePage = () => {
  const [renderComponent, setRenderComponent] = useState('ListFeedPage');
  const {
    params: {item},
  } = useRoute();
  const navigation = useNavigation();
  const [listJoin, setListJoin] = useState(false);
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listJoinStatus, setListJoinStatus] =
    useRecoilState(listMembershipStatus);
  const [loading, setLoading] = useState(false);
  const [listArray, setListArray] = useState([]);
  const [listDetails, setListDetails] = useState([]);
  const [userList, setUserList] = useRecoilState(UserLists);

  const URL = Config.BASE_URL;

  const getListArray = async () => {
    try {
      const response = await axios.post(`${URL}/api/get-all-lists`, {
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListArray(response.data);
        setListJoinStatus(!listJoinStatus);
        // setUserList(response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListDetails = async () => {
    try {
      const response = await axios.get(`${URL}/api/lists-details/${item.id}`);
      if (response.status == 200) {
        setListDetails(response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListArray();
    getListDetails();
  }, [listJoin]);

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
      console.log(error);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderViewLogic = () => {
    switch (renderComponent) {
      case 'ListFeedPage':
        return <ListFeedPage itemId={item.id} />;
      case 'ListRankings':
        return <ListRanking />;
      case 'ListInsights':
        return <ListInsights />;
      default:
        return <ListFeedPage />;
    }
  };

  return (
    <View style={styles.ListHomePageView}>
      {/* <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>{item.list_name}</Text>
      </Pressable> */}
      <View>
        <View style={styles.ListHeader}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
            <Image
              style={{width: 20, height: 20}}
              // source={{uri: item.list_logo}}
              source={require('../../assets/images/icons/user-default-image1.png')}
            />
            <Text style={styles.ListTitle}>{item.list_name}</Text>
          </View>
          {/* <Pressable>
            <Image
              style={styles.ListSettings}
              source={require('../../assets/images/icons/list-settings-icon-bk.png')}
            />
          </Pressable> */}
        </View>
        <View>
          <Text style={styles.ListDescription}>{item.description}</Text>
        </View>

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

        <View>
          {isItemInListArray === true ? (
            <View
              style={{
                flexDirection: 'row',
                // width: '100%',
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
            <Pressable onPress={ListJoinLogic}>
              <Text style={styles.ListJoinBtn}>
                {loading ? <ActivityIndicator /> : 'Join List'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View
        style={{
          marginVertical: 13,
          width: '100%',
          height: 1.1,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}></View>

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
      <View>{renderViewLogic()}</View>
    </View>
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
    marginVertical: 3,
  },
  HeaderIconView: {
    //     width: '65%',
    marginVertical: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
