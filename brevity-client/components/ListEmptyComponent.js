import React from 'react';
import {Text} from 'react-native';

const ListEmptyComponent = () => {
  return (
    <>
      <Text
        style={{
          color: '#39404A',
          fontSize: 12,
          fontFamily: 'Inter-SemiBold',
        }}>
        List is Empty.
      </Text>
    </>
  );
};

export default ListEmptyComponent;
