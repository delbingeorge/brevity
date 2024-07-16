import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ScreamPage = () => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 15}}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../../assets/images/icons/go-back-bk.png')}
        />
        {/* <Text style={styles.GoBackText}></Text> */}
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.bubbleContainer}>
          <Image
            style={{width: 28, height: 28, borderRadius: 100}}
            source={require('../../../assets/images/icons/user-default-image.png')}
          />
          <View style={styles.bubbleLeft}>
            <Text style={styles.bubbleText}>
              Can someone guide me to start with javascript?
            </Text>
          </View>
        </View>

        <View style={[styles.bubbleContainer, styles.alignRight]}>
          <View style={styles.bubbleRight}>
            <Text style={styles.bubbleText}>Yeah sure!</Text>
          </View>
        </View>
        <View style={[styles.bubbleContainer, styles.alignRight]}>
          <View style={styles.bubbleRight}>
            <Text style={styles.bubbleText}>Drop your queries here.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.MessageInput}>
        <TextInput
          placeholder="Ask something..."
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          // value={searchText}
          // onChangeText={setSearchText}
          style={{
            fontSize: 15,
            fontFamily: 'Inter-Medium',
            backgroundColor: '#f8f8f8',
            color: 'black',
            width: '85%',
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: 5,
          }}
          // onSubmitEditing={searchHandler}
        />
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 12, borderRadius: 8}}
          // onPress={searchHandler}
        >
          <Image
            style={{width: 25, height: 25, tintColor: 'white'}}
            source={require('../../../assets/images/icons/send-icon-bk.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreamPage;

const styles = StyleSheet.create({
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    // paddingHorizontal: 15,
    gap: 13,
    paddingVertical: 12,
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
  MessageInput: {
    position: 'absolute',
    marginHorizontal: 8,
    marginVertical: 10,
    bottom: 0,
    right: 0,
    left: 0,
    // marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // backgroundColor: 'red',
  },
  bubbleContainer: {
    columnGap: 7,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  bubbleLeft: {
    position: 'relative',
    backgroundColor: 'black',
    padding: 10,
    // width: '80%',
    maxWidth: '80%',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  bubbleRight: {
    position: 'relative',
    backgroundColor: '#548DFE',
    padding: 10,
    maxWidth: '80%',
    // width: '80%',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  bubbleText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 23,
  },
});
