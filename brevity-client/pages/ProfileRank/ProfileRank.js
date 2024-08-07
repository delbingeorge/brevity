import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const ProfileRank = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.GoBack}>
            <Image
              style={styles.GoBackIcon}
              source={require('../../assets/images/icons/go-back-bk.png')}
            />
            <Text style={styles.GoBackText}>Brevity Journey </Text>
          </Pressable>
          <Text style={styles.SubTitleText}>
            Solve hosted issues and earn badges, prefixes, special features and
            more.
          </Text>
        </View>
      </View>
    </>
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
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingVertical: 5,
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
});
