import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScreamPage = () => {
  const navigation = useNavigation();
  const [micStatus, setMicStatus] = useState(false);
  const [speakerStatus, setSpeakerStatus] = useState(true);

  const MicOpen = require('../../../assets/images/icons/room-icons/microphone-open.png');
  const MicClose = require('../../../assets/images/icons/room-icons/microphone-close.png');

  const SpeakerOpen = require('../../../assets/images/icons/room-icons/audio-open.png');
  const SpeakerClose = require('../../../assets/images/icons/room-icons/audio-close.png');

  const roomMembers = [
    {
      name: 'Noah Thompson',
      'profile-picture':
        'https://i.pinimg.com/736x/07/5b/58/075b5805b148c72977b70053a9d61220.jpg',
    },
    {
      name: 'Ava Smith',
      'profile-picture':
        'https://i.pinimg.com/564x/1f/8f/db/1f8fdb7a28650d64e6b37deae9073e92.jpg',
    },
    {
      name: 'Liam Johnson',
      'profile-picture':
        'https://i.pinimg.com/736x/d6/ee/68/d6ee684ae3b2d1a529fa50efb33cbe12.jpg',
    },
    {
      name: 'Emma Williams',
      'profile-picture':
        'https://i.pinimg.com/564x/90/28/18/902818f7bbc662d2161ab5ad04c0cfae.jpg',
    },
    {
      name: 'James Brown',
      'profile-picture':
        'https://i.pinimg.com/564x/ef/21/0e/ef210ebaa100c3a94a6be60a99171f3c.jpg',
    },
    {
      name: 'Olivia Jones',
      'profile-picture':
        'https://i.pinimg.com/564x/9a/f1/4f/9af14f00a425ab2c877c5e994c724b2e.jpg',
    },
    {
      name: 'Benjamin Garcia',
      'profile-picture':
        'https://i.pinimg.com/736x/24/b4/8d/24b48d54b6aa92ecefa8352dd3d5b4d8.jpg',
    },
    {
      name: 'Isabella Martinez',
      'profile-picture':
        'https://i.pinimg.com/564x/61/a3/c6/61a3c6a33a77692abe9f1b53cc324d59.jpg',
    },
    {
      name: 'Sophia Lopez',
      'profile-picture':
        'https://i.pinimg.com/564x/e8/ef/2d/e8ef2dfac112abd94f30f4442872bd28.jpg',
    },
  ];

  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 15}}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={[styles.image, {zIndex: 3}]}
        />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={[styles.image, {marginLeft: -12, zIndex: 2}]}
        />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={[styles.image, {marginLeft: -12, zIndex: 1}]}
        />
        <Text style={styles.text}>& 15 others</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          rowGap: 15,
          flexWrap: 'wrap',
          paddingBottom: 90,
        }}>
        {roomMembers.map((value, key) => (
          <View
            key={key}
            style={{alignItems: 'center', rowGap: 5, width: '30%'}}>
            <Image
              source={{
                uri: value['profile-picture'],
              }}
              style={{width: 70, height: 70, borderRadius: 30}}
            />
            <ScrollView horizontal>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                  fontSize: 13.4,
                  textAlign: 'center',
                }}>
                {value.name}
              </Text>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <View style={styles.RoomController}>
        <View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.LeaveRoomButton}>
            <Text style={styles.LeaveRoomText}>Walk Out</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', columnGap: 8}}>
          <Pressable
            onPress={() => {
              setMicStatus(!micStatus);
            }}
            style={styles.RoomControls}>
            <Image
              style={styles.RoomControlsImage}
              source={micStatus ? MicOpen : MicClose}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSpeakerStatus(!speakerStatus);
            }}
            style={styles.RoomControls}>
            <Image
              style={styles.RoomControlsImage}
              source={speakerStatus ? SpeakerOpen : SpeakerClose}
            />
          </Pressable>
          <Pressable style={styles.RoomControls}>
            <Image
              style={styles.RoomControlsImage}
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

  // Room Header

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 6,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    marginLeft: 10,
  },

  // Room Controller

  RoomController: {
    backgroundColor: 'white',
    paddingVertical: 15,
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
    zIndex: 1000,
  },
  LeaveRoomButton: {
    backgroundColor: 'rgba(240, 89, 156,0.2)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 7,
    borderRadius: 10,
    columnGap: 8,
    paddingHorizontal: 20,
  },
  LeaveRoomText: {
    fontFamily: 'Inter-Medium',
    color: 'rgba(240, 89, 156,0.8)',
    fontSize: 15,
  },
  RoomControls: {
    backgroundColor: '#f4f4f4',
    padding: 11,
    borderRadius: 100,
  },
  RoomControlsImage: {width: 20, height: 20},
});
