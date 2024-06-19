import React from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';

const IssueComponent = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('screen').height,
      }}>
          <Text>Hello</Text>
      </SafeAreaView>
  );
};

export default IssueComponent;
