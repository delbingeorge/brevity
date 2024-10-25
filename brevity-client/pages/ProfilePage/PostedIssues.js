import axios from 'axios';
import * as Burnt from 'burnt';
import {useRecoilValue} from 'recoil';
import Config from 'react-native-config';
import {userInfo} from '../../provider/RecoilStore';
import {useNavigation} from '@react-navigation/native';
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

const PostedIssues = () => {
  const URL = Config.BASE_URL;
  const profileInfo = useRecoilValue(userInfo);
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPostedIssues();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPostedIssues();
    setRefreshing(false);
  };

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
      Burnt.toast({
        title: 'Something went wrong!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderIssue = useCallback(({item}) => {
    let postDate = new Date(item.created_at);
    const currentDate = new Date();

    const diff = currentDate - postDate;
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    return (
      <Pressable
        style={{
          borderBottomColor: 'rgba(0,0,0,0.2)',
        }}
        onPress={() => {
          navigation.navigate('ManageIssue', {item});
        }}>
        <Text
          style={{color: 'black', fontFamily: 'Inter-Medium', fontSize: 16}}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 15,
            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 6,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/icons/date-icon-bk.png')}
              style={{width: 15, height: 15, objectFit: 'contain'}}
            />
            <Text style={{color: 'black'}}>
              {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
            </Text>
          </View>
          <Text style={{color: 'black'}}>|</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 6,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/icons/list-icon-bk.png')}
              style={{width: 15, height: 15, objectFit: 'contain'}}
            />
            <Text style={{color: 'black'}}>{item.list_name}</Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

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
        <ActivityIndicator style={{marginTop: 25}} />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={result}
          renderItem={renderIssue}
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
