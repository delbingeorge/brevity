import React from 'react';
import {Text, View} from 'react-native';
import ReactModal from './ReactModal';
import ReactNativeModal from 'react-native-modal';

const ProfileView = () => {
  return (
    <ReactNativeModal>
      <Text style={{color: 'black'}}>Hello</Text>
    </ReactNativeModal>
  );
};

export default ProfileView;
