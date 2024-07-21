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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authState, modalView, userInfo} from '../../provider/RecoilStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import ReactModal from '../../components/ReactModal';
import axios from 'axios';
import Config from 'react-native-config';
import {useEffect, useState} from 'react';
import {Skeleton} from 'react-native-skeletons';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import ReactNativeModal from 'react-native-modal';

const FeedPage = () => {
  const URL = Config.BASE_URL;
  const navigation = useNavigation();
  const authValue = useRecoilState(authState);
  const [showModalView, setShowModalView] = useRecoilState(modalView);
  const [feedData, setFeedData] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const profileInfo = useRecoilValue(userInfo);
  const [isModalVisible, setModalVisible] = useState(false);

  const defaultImage = require('../../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const pressedImage = require('../../assets/images/icons/issue-actions/unsolved-issue-icon.png');

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  useEffect(() => {
    getFeedData();
  }, [authValue[0], navigation]);

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
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getFeedData();
    setRefreshing(false);
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
            onPress={setModalVisible(true)}>
            <Image style={styles.HeaderImage} source={{uri: item.photo}} />
            <Text style={styles.HeaderUserName}>{item.name}</Text>
          </Pressable>
          <Text style={styles.HeaderDivider}> · </Text>
          <Pressable
          // onPress={() => {
          //   navigation.navigate('ListHomePage', {item});
          // }}
          >
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
          {/* <View style={styles.IssueAction}>
          <Image
            style={styles.IssueActionIcon}
            source={require('../../assets/images/icons/issue-actions/issue-reach-icon.png')}
          />
          <Text style={styles.IssueActionCount}>109</Text>
        </View> */}
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
    <SafeAreaView style={styles.MainView}>
      <View style={styles.NavView}>
        <Pressable>
          <Image
            style={styles.NavLogo}
            source={require('../../assets/images/logo/brevity.png')}
          />
        </Pressable>

        <Pressable
          style={{display: authValue[0] == true ? 'flex' : 'none'}}
          onPress={() => {
            navigation.navigate('ProfileRank');
          }}>
          <Image
            style={styles.CrownRank}
            source={require('../../assets/images/icons/crown-rank.png')}
          />
        </Pressable>

        <Pressable
          style={{display: authValue[0] == true ? 'none' : 'flex'}}
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
        <View style={{paddingHorizontal: 15, marginTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginBottom: 10,
            }}>
            <Skeleton circle width={25} color={'rgba(0,0,0,0.1)'} height={25} />
            <Skeleton
              count={1}
              width={'50%'}
              color={'rgba(0,0,0,0.1)'}
              height={13}
            />
          </View>
          <Skeleton
            count={7}
            width={'100%'}
            height={14}
            color={'rgba(0,0,0,0.1)'}
            borderRadius={4}
            style={styles.myCustomStyle}
          />
        </View>
      ) : (
        <FlatList
          data={feedData}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          // ListEmptyComponent={<ListEmptyComponent />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListFooterComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color: '#39404A',
                  fontSize: 13,
                  fontFamily: 'Inter-Medium',
                }}>
                End of issues? No way.
              </Text>
              <Pressable onPress={onRefresh}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontFamily: 'Inter-Medium',
                  }}>
                  Load more issues.
                </Text>
              </Pressable>
            </View>
          }
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

      {showModalView && <ReactModal />}
    </SafeAreaView>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
    // paddingHorizontal: 15,
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
  },
  CrownRank: {
    height: 20,
    width: 20,
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
    backgroundColor: 'white',
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
