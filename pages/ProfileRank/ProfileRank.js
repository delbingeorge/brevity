import React from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';

const ProfileRank = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('screen').height,
        paddingHorizontal: 15,
      }}>
      <StatusBar backgroundColor="white" />
      <View>
        <Text style={styles.TitleText}>Brevity Journey </Text>
        <Text style={styles.SubTitleText}>
          Solve hosted issues and earn badges, prefixes, special features and
          more.
        </Text>
      </View>
    </View>
  );
};

export default ProfileRank;

const styles = StyleSheet.create({
  TitleText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 3,
  },
  SubTitleText: {
    color: '#39404A',
    lineHeight: 22,
    fontSize: 17,
  },
});
