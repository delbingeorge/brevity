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

      <View>
        <Pressable style={styles.SettingsButton}>
          {/* <Image
            style={styles.SettingsImage}
            source={require('../../assets/images/icons/theme-icon-bk.png')}
          /> */}
          <Text style={styles.SettingsText}>Theme</Text>
        </Pressable>
        <Pressable style={styles.SettingsButton}>
          {/* <Image
            style={styles.SettingsImage}
            source={require('../../assets/images/icons/report-icon-bk.png')}
          /> */}
          <Text style={styles.SettingsText}>Report an issue</Text>
        </Pressable>
        <Pressable style={styles.SettingsButton}>
          <Text style={styles.SettingsText}>Account Management</Text>
        </Pressable>
        <Pressable style={styles.SettingsButton}>
          <Text style={styles.SettingsText}>Privacy</Text>
        </Pressable>
        <Pressable style={styles.SettingsButton}>
          <Text style={styles.SettingsText}>Help</Text>
        </Pressable>
        <Pressable style={styles.SettingsButton}>
          <Text style={styles.SettingsText}>About</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  SettingsView: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
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
  SettingsButton: {
    paddingBottom: 14,
    flexDirection: 'row',
    columnGap: 12,
  },
  SettingsImage: {
    width: 23,
    height: 23,
  },
  SettingsText: {color: 'black', fontSize: 17, fontFamily: 'Inter-Regular'},
});
