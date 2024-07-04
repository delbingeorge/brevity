import axios from 'axios';
import {useState} from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ExplorePage = () => {
  const [searchText, setSearchText] = useState('');

  const searchHandler = async () => {
    console.log('search handler');
    try {
      const response = await axios.post(
        'http://192.168.1.105:8000/api/search',
        {query: searchText},
      );
      console.log(response.data);
    } catch (error) {
      console.log('Catch block!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.ExplorePageView}>
      <View style={styles.SearchInput}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'black'}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Pressable>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../assets/images/icons/search-icon-bk.png')}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: '#F9F9F9',
    fontFamily: 'Inter-Medium',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});
