import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ExplorePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const navigation = useNavigation();

  const searchHandler = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.105:8000/api/explore-search',
        {query: searchText},
      );

      if (response.status == 200) {
        setSearchRes(response.data['searchResponse']);
        console.log(response.data['searchResponse']);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log('Catch block!');
    }
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
      <View style={styles.SearchInput}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'black'}
          value={searchText}
          onChangeText={setSearchText}
          style={{
            fontSize: 15,
            fontFamily: 'Inter-Medium',
            color: 'black',
            width: '85%',
          }}
          onSubmitEditing={searchHandler}
        />
        <TouchableOpacity onPress={searchHandler}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/images/icons/search-icon-bk.png')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 13,
          width: '100%',
          height: 1.1,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}></View>

      {searchRes.length > 0 ? (
        <View>
          <View style={styles.ResultView}>
            <View style={styles.ResultTextView}>
              <Text style={styles.ResponseText}>Result for</Text>
              <Text style={styles.ResponseSearchText}>"{searchText}"</Text>
            </View>
            <Pressable
              onPress={() => {
                setSearchText('');
                setSearchRes([]);
              }}>
              <Text style={styles.ResponseClearText}>Clear</Text>
            </Pressable>
          </View>
          <FlatList data={searchRes} renderItem={searchItem} />
        </View>
      ) : (
        <View>
          <View style={styles.ResultView}>
            <View style={styles.ResultTextView}>
              <Text style={styles.ResponseSearchText}>Popular Lists</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  ExplorePageView: {flex: 1, backgroundColor: 'white', paddingHorizontal: 15},
  SearchInput: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  ResultView: {
    // marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ResultTextView: {flexDirection: 'row', columnGap: 4},
  ResponseText: {color: 'rgba(0,0,0,0.5)', fontFamily: 'Inter-Medium'},
  ResponseSearchText: {color: 'rgba(0,0,0,0.7)', fontFamily: 'Inter-SemiBold'},
  ResponseClearText: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    backgroundColor: 'white',
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    fontSize: 12,
    paddingHorizontal: 13,
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
