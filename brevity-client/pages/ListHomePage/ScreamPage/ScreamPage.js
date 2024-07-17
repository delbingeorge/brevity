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
      <Text style={styles.GoBackText}>JavaScript</Text>
      {/* <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../../assets/images/icons/go-back-bk.png')}
        />
      </Pressable> */}
      {/* <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.bubbleContainer}>
          <Image
            style={{width: 28, height: 28, borderRadius: 100}}
            source={require('../../../assets/images/icons/user-default-image.png')}
          />
          <View style={styles.bubbleLeft}>
            <Text style={styles.bubbleText}>
              I'm a Spring developer, but now our client wants us to do it using
              JavaScript. So I'm considering the best approach. Do you have any
              recommendations on how to transition from Spring to JavaScript
              effectively?
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.MessageInput}>
        <TextInput
          placeholder="Ask something..."
          placeholderTextColor={'rgba(0,0,0,0.4)'}
         
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
      </View> */}

      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          // height: 70,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.2,
          borderTopColor: 'rgba(0,0,0,0.1)',
          paddingHorizontal: 10,
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 0,
        }}>
        <View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: 'rgba(240, 89, 156,0.2)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 7,
              borderRadius: 10,
              columnGap: 5,
              paddingHorizontal: 20,
            }}>
            {/* <Image
              style={{width: 20, height: 20, tintColor: 'white'}}
              source={require('../../../assets/images/icons/leave-icon-bk.png')}
            /> */}
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                color: 'rgba(240, 89, 156,0.8)',
                fontSize: 15,
              }}>
              Leave
            </Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', columnGap: 8}}>
          <Pressable
            style={{
              backgroundColor: '#f4f4f4',
              padding: 11,
              borderRadius: 100,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/icons/room-icons/microphone-open.png')}
            />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#f4f4f4',
              padding: 11,
              borderRadius: 100,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/icons/room-icons/audio-open.png')}
            />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#f4f4f4',
              padding: 11,
              borderRadius: 100,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/icons/room-icons/room-menu.png')}
            />
          </Pressable>
        </View>
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
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  bubbleLeft: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,1)',
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
