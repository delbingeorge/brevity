// Module imports
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const IssuePostStatus = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator />
    </View>
  );
};

export default IssuePostStatus;
