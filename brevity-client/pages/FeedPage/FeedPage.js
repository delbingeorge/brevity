// Module imports
import axios from 'axios';
import Config from 'react-native-config';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as Burnt from 'burnt';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  authState,
  getTheme,
  listMembershipStatus,
  modalView,
  ProfileModal,
  userInfo,
  UserProfileInfo,
} from '../../provider/RecoilStore';

// Component imports
import FeedContentLoader from '../../components/Skeleton/FeedContentLoader';
import ProfileView from '../../components/ProfileView';
import Authentication from '../../components/Authentication';
import colorScheme from '../../assets/colors/colorScheme';

const FeedPage = () => {
  const URL = Config.BASE_URL;
  const navigation = useNavigation();
  const authValue = useRecoilState(authState);
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [feedData, setFeedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const profileInfo = useRecoilValue(userInfo);
  const listMembershipStatusCheck = useRecoilValue(listMembershipStatus);
  const [isModalVisible, setModalVisible] = useRecoilState(ProfileModal);
  const [modalInfo, setModalInfo] = useRecoilState(UserProfileInfo);
  const [theme, setTheme] = useRecoilState(getTheme);
  const [connectivity, setConnectivity] = useState(true);
  const styles = createStyle(theme);

  // const networkStatus = useNetInfo();
  // console.log(networkStatus.isConnected());

  useEffect(() => {
    getFeedData();
  }, [authValue[0], navigation, listMembershipStatusCheck]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getFeedData();
    setRefreshing(false);
  };

  const handlePress = async issueId => {
    if (!authValue[0]) {
      setShowModalView(true);
    } else {
      try {
        const response = await axios.get(`${URL}/api/upvote/${issueId}`);
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log(response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFeedData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/api/get-feed/${
          authValue[0] === false ? authValue[0] : profileInfo.id
        }`,
      );
      if (response.status === 200) {
        setFeedData(response.data['content']);
      } else {
        Burnt.toast({
          title: 'Try reloading!',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
      }
    } catch (error) {
      setConnectivity(false);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    const isLongText = item.body.length > 250;
    const displayText = isLongText ? item.body.substring(0, 200) : item.body;

    return (
      <Pressable
        onPress={() => navigation.navigate('IssueComponent', {item})}
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
          <Text style={styles.IssueText}>
            {displayText}
            {isLongText && (
              <Text style={styles.ReadMoreText}> ...read more</Text>
            )}
          </Text>
        </View>
        <View style={styles.IssueActionView}>
          <Pressable
            onPress={() => handlePress(item.issueId)}
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
            <View>
              <Image
                style={styles.IssueActionIcon}
                source={require('../../assets/images/icons/issue-actions/issue-upvote.png')}
              />
            </View>
            <Text style={styles.IssueActionCount}>{item.upvote}</Text>
          </Pressable>
          <View style={styles.IssueAction}>
            <Image
              style={styles.IssueActionIcon}
              source={require('../../assets/images/icons/issue-actions/issue-solution-icon.png')}
            />
            <Text style={styles.IssueActionCount}>{item.responseCount}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.MainView}>
      <StatusBar
        backgroundColor={
          theme === 'dark'
            ? colorScheme.darkTheme['primary-dark']
            : colorScheme.lightTheme['primary-light']
        }
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.NavView}>
        <Pressable>
          <Image
            style={styles.NavLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
        </Pressable>

        <Pressable
          style={{
            display: authValue[0] == true ? 'flex' : 'none',
            width: 50,
            alignItems: 'flex-end',
          }}
          onPress={() => {
            navigation.navigate('ProfileRank');
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/crown-rank.png')}
          />
        </Pressable>

        <Pressable
          style={{
            display: authValue[0] == true ? 'none' : 'flex',
            width: 50,
            alignItems: 'flex-end',
          }}
          onPress={() => {
            setShowModalView(true);
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/profile-icon-bk.png')}
          />
        </Pressable>
      </View>

      {loading == true ? (
        <FeedContentLoader />
      ) : (
        <FlatList
          data={feedData}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{paddingBottom: 80}}
          // ListEmptyComponent={<ListEmptyComponent />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          // ListFooterComponent={
          //   <View
          //     style={{
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //       paddingVertical: 8,
          //     }}>
          //     <Text
          //       style={{
          //         color: '#39404A',
          //         fontSize: 13,
          //         fontFamily: 'Inter-Medium',
          //       }}>
          //       End of issues? No way.
          //     </Text>
          //     <Pressable onPress={onRefresh}>
          //       <Text
          //         style={{
          //           color: 'black',
          //           fontSize: 12,
          //           fontFamily: 'Inter-Medium',
          //         }}>
          //         Load more issues.
          //       </Text>
          //     </Pressable>
          //   </View>
          // }
          //  ListFooterComponent={
          //   <View
          //     style={{
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //       paddingVertical: 8,
          //     }}>
          //     <Text
          //       style={{
          //         color: '#39404A',
          //         fontSize: 13,
          //         fontFamily: 'Inter-Medium',
          //       }}>
          //       End of issues? No way.
          //     </Text>
          //     <Pressable onPress={onRefresh}>
          //       <Text
          //         style={{
          //           color: 'black',
          //           fontSize: 12,
          //           fontFamily: 'Inter-Medium',
          //         }}>
          //         Load more issues.
          //       </Text>
          //     </Pressable>
          //   </View>
          // }
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: '#548DFE',
          height: 45,
          width: 45,
          borderRadius: 50,
          display: authValue[0] == true ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 110,
          right: 20,
        }}
        onPress={() => navigation.navigate('IssuePostForm')}>
        <Image
          style={{height: 19, width: 19}}
          source={require('../../assets/images/icons/issue-post-plus-icon.png')}
        />
      </TouchableOpacity>

      {isModalVisible && <ProfileView />}

      {showModalView && <Authentication />}
    </SafeAreaView>
  );
};

export default FeedPage;

const createStyle = theme =>
  StyleSheet.create({
    MainView: {
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      height: Dimensions.get('screen').height,
      paddingBottom: 35,
    },
    NavView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 11,
      paddingVertical: 5,
    },
    NavLogo: {
      height: 20,
      width: 76,
      objectFit: 'contain',
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
    },
    CrownRank: {
      height: 21,
      width: 21,
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
    },
    BottomNavBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 3,
      borderColor: 'white',
    },
    NavHome: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    NavText: {
      fontSize: 16,
      color: 'black',
      fontFamily: 'Inter-medium',
    },
    IssueComponent: {
      borderBottomColor: 'rgba(0,0,0,0.06)',
      borderBottomWidth: 1.3,
      // paddingVertical: 10,
      marginBottom: 5,
      // marginVertical: 8,
      paddingHorizontal: 15,
    },
    IssueHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 1,
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
      // fontSize: 16,
      fontSize: 14,
    },
    HeaderDivider: {
      fontSize: 20,
      color: theme === 'dark' ? '#C2C8CF' : '#687684',
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
      paddingHorizontal: 14,
      marginVertical: 10,
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
    ReadMoreText: {
      color: theme === 'dark' ? 'white' : colorScheme.lightTheme.dark,
      fontSize: 13,
      fontFamily: 'Inter-SemiBold',
    },
  });
