// Module imports
import React from 'react';
import {Image, Pressable} from 'react-native';

const IssuePost = () => {
  return (
    <Pressable
      style={{
        backgroundColor: '#548DFE',
        height: 45,
        width: 45,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 110,
        right: 20,
      }}>
      <Image
        style={{height: 19, width: 19}}
        source={require('../assets/images/icons/issue-post-plus-icon.png')}
      />
    </Pressable>
  );
};

export default IssuePost;
