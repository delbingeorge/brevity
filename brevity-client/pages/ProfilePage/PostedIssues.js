import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {useRecoilValue} from 'recoil';
import {userInfo} from '../../provider/RecoilStore';
import {useNavigation} from '@react-navigation/native';

const PostedIssues = () => {
  const URL = Config.BASE_URL;
  const profileInfo = useRecoilValue(userInfo);
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostedIssues();
  }, []);

  const getPostedIssues = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/api/get-posted-issues/${profileInfo.id}`,
      );
      if (response.status == 200) {
        setResult(response.data['content']);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    let postDate = new Date('2024-07-18 17:42:03');
    const currentDate = new Date();

    const diff = currentDate - postDate;
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

  const renderIssue = useCallback(
    ({item}) => (
      <Pressable
        style={{
          paddingBottom: 14,
          borderBottomColor: 'rgba(0,0,0,0.2)',
          borderBottomWidth: 1,
        }}
        onPress={() => {
          navigation.navigate('ManageIssue', {item});
        }}>
        <Text
          style={{color: 'black', fontFamily: 'Inter-Medium', fontSize: 16}}>
          {item.title}
        </Text>
        <Text
          style={{color: 'black', fontSize: 14.5, fontFamily: 'Inter-Regular'}}>
          {item.body.substring(0, 50)}
        </Text>
        <Text style={{color: 'black'}}>{`posted ${daysAgo} days ago`}</Text>
      </Pressable>
    ),
    [navigation],
  );

  return (
    <View style={styles.PostedIssueView}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>Posted Issues</Text>
      </Pressable>

      {loading == true ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={result} renderItem={renderIssue} />
      )}
    </View>
  );
};

export default PostedIssues;

const styles = StyleSheet.create({
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingVertical: 5,
    borderBottomWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  GoBackIcon: {
    width: 25,
    height: 25,
  },
  GoBackText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: 'black',
  },
  PostedIssueView: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});
