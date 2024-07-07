import axios from 'axios';
import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {userInfo} from '../../provider/RecoilStore';
import {useRecoilState} from 'recoil';

const ListsPage = () => {
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);
  const [listArray, setListArray] = useState([]);

  useEffect(() => {
    const getJoinedLists = async () => {
      try {
        const response = await axios.post(
          'http://192.168.1.105:8000/api/get-all-lists',
          {user_id: profileInfo.id},
        );
        if (response.status == 200) {
          console.log(response.data);
          setListArray(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJoinedLists();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <View>
        <Text style={styles.TabTitle}>Lists you are on.</Text>
      </View>
      <View></View>
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
});
