import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {listMembershipStatus, userInfo} from '../../provider/RecoilStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

const ListsPage = () => {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listArray, setListArray] = useState([]);
  const membershipChanged = useRecoilValue(listMembershipStatus);

  const getJoinedLists = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/get-all-lists`, {
        user_id: profileInfo.id,
      });
      if (response.status == 200) {
        setListArray(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJoinedLists();
  }, [profileInfo, membershipChanged]);

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('ListHomePage', {item});
      }}
      style={styles.ResultRenderItem}>
      <Image
        style={{width: 32, height: 32}}
        source={require('../../assets/images/icons/user-default-image1.png')}
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
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      {listArray.length ? (
        <View>
          <Text style={styles.TabTitle}>Lists you are on.</Text>
          <FlatList
            data={listArray}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            extraData={listArray}
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
          <Image
            style={{
              height: 160,
              width: 160,
              objectFit: 'contain',
              opacity: 0.7,
            }}
            source={require('../../assets/images/logo/not-in-any-list.png')}
          />
          {/* <Text style={styles.NoListText}>Oops, You are not in any lists!</Text>
          <Pressable onPress={() => navigation.navigate('ExplorePage')}>
            <Text style={styles.NoListJoinButton}>Join now!</Text>
          </Pressable> */}
        </View>
      )}
    </View>
  );
};

export default ListsPage;

const styles = StyleSheet.create({
  TabTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  ResultRenderItem: {
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 15,
  },
  RenderItemTitle: {
    fontSize: 14.5,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  RenderItemSubtitle: {
    color: 'rgba(0,0,0,0.5)',
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
