import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PublicProfile = () => {
  const navigation = useNavigation();
  return (
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
        <Text style={styles.GoBackText}>Public Profile</Text>
      </Pressable>
    </View>
  );
};

export default PublicProfile;

const styles = StyleSheet.create({
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
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
});
