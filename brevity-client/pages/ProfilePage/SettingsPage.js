import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const SettingsPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.SettingsView}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>Settings</Text>
      </Pressable>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  SettingsView: {
    backgroundColor: 'white',
    flex: 1,
  },
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
  AccountSettings: {
    paddingHorizontal: 15,
  },
  Settings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 7,
    gap: 15,
  },
  SettingsImage: {
    width: 16,
    height: 16,
  },
  SettingsText: {color: 'black', fontSize: 16.8, fontFamily: 'Inter-Medium'},
});
