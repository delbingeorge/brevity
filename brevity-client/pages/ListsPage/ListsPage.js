import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {listMembershipStatus, userInfo} from '../../provider/RecoilStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';

const ListsPage = () => {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listArray, setListArray] = useState([]);
  const membershipChanged = useRecoilValue(listMembershipStatus);

  const getJoinedLists = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.105:8000/api/get-all-lists',
        {user_id: profileInfo.id},
      );
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
      <View>
        <Text style={styles.TabTitle}>Lists you are on.</Text>
      </View>
      <View>
        <FlatList
          data={listArray}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          extraData={listArray}
        />
      </View>
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
});
