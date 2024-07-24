import React from 'react';
import {View} from 'react-native';
import {Skeleton} from 'react-native-skeletons';

const FeedContentLoader = () => {
  return (
    <>
      <View style={{paddingHorizontal: 15, marginTop: 5, marginBottom: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
            marginBottom: 10,
          }}>
          <Skeleton circle width={25} color={'rgba(0,0,0,0.1)'} height={25} />
          <Skeleton
            count={1}
            width={'50%'}
            color={'rgba(0,0,0,0.1)'}
            height={13}
          />
        </View>
        <View>
          <Skeleton
            count={7}
            width={'100%'}
            height={14}
            color={'rgba(0,0,0,0.1)'}
            borderRadius={4}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
            marginBottom: 10,
          }}>
          <Skeleton circle width={25} color={'rgba(0,0,0,0.1)'} height={25} />
          <Skeleton
            count={1}
            width={'50%'}
            color={'rgba(0,0,0,0.1)'}
            height={13}
          />
        </View>
        <View>
          <Skeleton
            count={7}
            width={'100%'}
            height={14}
            color={'rgba(0,0,0,0.1)'}
            borderRadius={4}
          />
        </View>
      </View>
    </>
  );
};

export default FeedContentLoader;
