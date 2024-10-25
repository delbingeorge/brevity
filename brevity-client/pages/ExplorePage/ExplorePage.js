import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {Skeleton} from 'react-native-skeletons';
import * as Burnt from 'burnt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue} from 'recoil';
import {authState, getTheme} from '../../provider/RecoilStore';
import colorScheme from '../../assets/colors/colorScheme';

const ExplorePage = () => {
  const URL = Config.BASE_URL;
  const [searchText, setSearchText] = useState('');
  const [reqText, setReqText] = useState('');
  const [searchRes, setSearchRes] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const authValue = useRecoilValue(authState);
  const theme = useRecoilValue(getTheme);

  const styles = createStyle(theme);

  const hasResults = searchRes && searchRes.length > 0;
  const noResults = searchRes && searchRes.length === 0;

  const inputFieldFocus = useRef(null);

  useEffect(() => {
    if (inputFieldFocus.current) {
      inputFieldFocus.current.focus();
    }
    if (!authValue) {
      clearRecentSearch();
    }
  }, [authValue]);

  const clearRecentSearch = () => {
    setReqText('');
    setSearchRes();
    setSearchText('');
  };

  const searchHandler = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      setLoading(true);
      const response = await axios.post(
        `${URL}/api/explore-search`,
        {
          query: searchText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status == 200) {
        setSearchRes(response.data['searchResponse']);
        setReqText(response.data['searchRequest']);
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

  const NoResponseComponent = () => {
    return (
      <View style={{alignItems: 'center'}}>
        {/* <Image
          style={{width: 50, height: 50}}
          source={require('../../assets/images/icons/toast-icons/lying-face.png')}
        /> */}
        <Text
          style={{
            color:
              theme === 'dark'
                ? colorScheme.darkTheme.light
                : colorScheme.lightTheme.dark,
            textAlign: 'center',
            fontSize: 14,
            marginTop: 15,
            fontFamily: 'Inter-Regular',
          }}>
          No results were found for your search.
        </Text>
      </View>
    );
  };

  const searchItem = ({item}) => (
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
    <View style={styles.ExplorePageView}>
      <View style={styles.SearchView}>
        <View style={styles.SearchInput}>
          <Image
            style={{
              width: 23,
              height: 23,
              marginRight: 5,
              tintColor:
                theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)',
            }}
            source={require('../../assets/images/icons/search-icon-bk.png')}
          />
          <TextInput
            placeholder={`Search for "${'Javascript'}"`}
            placeholderTextColor={
              theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'
            }
            value={searchText}
            onChangeText={setSearchText}
            ref={inputFieldFocus}
            style={{
              fontSize: 15,
              fontFamily: 'Inter-Regular',
              color: theme === 'dark' ? 'white' : 'rgba(0,0,0,0.4)',
              width: '85%',
            }}
            onSubmitEditing={searchHandler}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setSearchRes();
              setSearchText();
            }}>
            <Image
              style={{
                display: searchText ? 'flex' : 'none',
                width: 18,
                height: 18,
                tintColor:
                  theme === 'dark'
                    ? 'rgba(255,255,255,0.4)'
                    : 'rgba(0,0,0,0.4)',
              }}
              source={require('../../assets/images/icons/text-clear-bk-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {hasResults && (
        <View>
          <View style={styles.ResultView}>
            <View style={styles.ResultTextView}>
              {/* <Text style={styles.ResponseSearchText}>{searchRes.length}</Text> */}
              <Text style={styles.ResponseText}>Result for</Text>
              <Text style={styles.ResponseSearchText}>"{reqText}"</Text>
            </View>
            {/* <Pressable
              onPress={() => {
                setSearchText('');
                setSearchRes();
              }}>
              <Text style={styles.ResponseClearText}>Clear</Text>
            </Pressable> */}
          </View>

          {loading == true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                columnGap: 15,
                alignItems: 'center',
              }}>
              <Skeleton
                circle
                width={40}
                height={40}
                color={'rgba(0,0,0,0.1)'}
              />
              <Skeleton
                count={1}
                width={'85%'}
                color={'rgba(0,0,0,0.1)'}
                height={15}
                borderRadius={15}
              />
            </View>
          ) : (
            <FlatList
              data={searchRes}
              renderItem={searchItem}
              ItemSeparatorComponent={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    marginVertical: 10,
                    height: 0.7,
                    width: '100%',
                  }}></View>
              }
              ListFooterComponent={
                <View>
                  <Text
                    style={{
                      color: 'rgba(0,0,0,0.6)',
                      fontFamily: 'Inter-Regular',
                      fontSize: 12,
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    End of results.
                  </Text>
                </View>
              }
              contentContainerStyle={{paddingBottom: 115}}
            />
          )}
        </View>
      )}

      {noResults && <NoResponseComponent />}
    </View>
  );
};

export default ExplorePage;

const createStyle = theme =>
  StyleSheet.create({
    ExplorePageView: {
      flex: 1,
      backgroundColor:
        theme === 'dark' ? colorScheme.darkTheme['primary-dark'] : 'white',
      paddingHorizontal: 15,
    },
    SearchView: {
      backgroundColor:
        theme === 'dark' ? colorScheme.darkTheme['primary-dark'] : 'white',
      paddingHorizontal: 15,
      position: 'absolute',
      zIndex: 13,
      right: 0,
      left: 0,
      bottom: 0,
    },
    SearchInput: {
      marginTop: 5,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        theme === 'dark' ? colorScheme.darkTheme['pitch-grey'] : '#f8f8f8',
      fontFamily: 'Inter-Medium',
      paddingHorizontal: 12,
      paddingVertical: 0,
      borderRadius: 8,
    },
    ResultView: {
      // marginTop: 15,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ResultTextView: {flexDirection: 'row', columnGap: 4, marginBottom: 5},
    ResponseText: {
      color:
        theme === 'dark'
          ? 'rgba(255,255,255,0.4)'
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-Medium',
    },
    ResponseSearchText: {
      color:
        theme === 'dark'
          ? 'rgba(255,255,255,0.4)'
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-SemiBold',
    },
    ResponseClearText: {
      color:
        theme === 'dark'
          ? 'rgba(255,255,255,0.4)'
          : colorScheme.lightTheme.dark,
      fontFamily: 'Inter-SemiBold',
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['pitch-grey']
          : 'rgba(0,0,0,0.4)',
      paddingVertical: 2,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#dfdfdf',
      fontSize: 12,
      paddingHorizontal: 13,
    },
    ResultRenderItem: {
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
      color:
        theme === 'dark'
          ? colorScheme.lightTheme['off-white']
          : 'rgba(0,0,0,0.4)',
      fontFamily: 'Inter-Regular',
    },
  });
