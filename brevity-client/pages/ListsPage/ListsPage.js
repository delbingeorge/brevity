import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  authState,
  getTheme,
  listMembershipStatus,
  userInfo,
} from '../../provider/RecoilStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {Skeleton} from 'react-native-skeletons';
import * as Burnt from 'burnt';

const ListsPage = () => {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listArray, setListArray] = useState([]);
  const membershipChanged = useRecoilValue(listMembershipStatus);
  const [loading, setLoading] = useState(false);
  const authValue = useRecoilValue(authState);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useRecoilValue(getTheme);

  const styles = createStyle(theme);

  const URL = Config.BASE_URL;

  useEffect(() => {
    if (authValue) {
      getJoinedLists();
    }
  }, [profileInfo, membershipChanged]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getJoinedLists();
    setRefreshing(false);
  };

  const getJoinedLists = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/api/get-all-lists`, {
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListArray(response.data);
      }
      setLoading(false);
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

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('ListHomePage', {item});
      }}
      style={styles.ResultRenderItem}>
      <Image
        style={{width: 28, height: 28}}
        source={require('../../assets/images/icons/user-default-image1.png')}
        // source={{uri: item.list_logo}}
      />
      <View>
        <Text style={styles.RenderItemTitle}>{item.list_name}</Text>
        <Text style={styles.RenderItemSubtitle}>
          {item.description.substring(0, 40) + '...'}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === 'dark'
            ? colorScheme.darkTheme['primary-dark']
            : colorScheme.lightTheme['primary-light'],
        paddingHorizontal: 15,
      }}>
      {listArray.length ? (
        <View>
          <Text style={styles.TabTitle}>Lists you are on.</Text>
          <FlatList
            data={listArray}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            extraData={listArray}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            contentContainerStyle={{paddingBottom: 30}}
            ItemSeparatorComponent={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  marginVertical: 10,
                  height: 0.7,
                  width: '100%',
                }}></View>
            }
          />
        </View>
      ) : loading == true ? (
        <View style={{marginTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginBottom: 10,
            }}>
            <Skeleton
              count={1}
              width={'80%'}
              color={
                theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }
              height={13}
            />
          </View>
          <Skeleton
            count={2}
            width={'100%'}
            height={14}
            color={
              theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }
            borderRadius={4}
            style={styles.myCustomStyle}
          />
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.NoListText}>Oops, You are not in any lists!</Text>
          <Pressable onPress={() => navigation.navigate('ExplorePage')}>
            <Text style={styles.NoListJoinButton}>Join now!</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ListsPage;

const createStyle = theme =>
  StyleSheet.create({
    TabTitle: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      marginBottom: 10,
    },
    ResultRenderItem: {
      // paddingBottom: 10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      columnGap: 15,
    },
    RenderItemTitle: {
      fontSize: 14.5,
      color:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-SemiBold',
    },
    RenderItemSubtitle: {
      color: theme === 'dark' ? colorScheme.darkTheme.white : 'rgba(0,0,0,0.4)',
      fontFamily: 'Inter-Regular',
    },
    NoListText: {
      color: 'rgba(0,0,0,0.9)',
      fontSize: 14,
      fontFamily: 'Inter-Medium',
    },
    NoListJoinButton: {
      color: 'blue',
      marginTop: 4,
      fontSize: 14,
      textDecorationLine: 'underline',
      fontFamily: 'Inter-SemiBold',
    },
  });
