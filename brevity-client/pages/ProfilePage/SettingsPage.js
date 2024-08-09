import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {getTheme} from '../../provider/RecoilStore';
import colorScheme from '../../assets/colors/colorScheme';
import ReactNativeModal from 'react-native-modal';

const SettingsPage = () => {
  const [theme, setTheme] = useRecoilState(getTheme);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const toggleTheme = mode => {
    setTheme(mode);
  };

  const toggleThemeModal = () => {
    setShowModal(!showModal);
  };

  const styles = createStyle(theme);

  return (
    <>
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

        <View style={{marginTop: 15}}>
          <Pressable onPress={toggleThemeModal} style={styles.SettingsButton}>
            {/* <Image
            style={styles.SettingsImage}
            source={require('../../assets/images/icons/theme-icon-bk.png')}
          /> */}
            <Text style={styles.SettingsText}>Theme</Text>
          </Pressable>
          <Pressable style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>Account management</Text>
          </Pressable>
          <Pressable style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>Privacy & policy</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL('mailto: imdelbingeorge@gmail.com');
            }}
            style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>Seek help</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(
                'https://github.com/delbingeorge/delbingeorge/issues/new',
              );
            }}
            style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>Report an issue</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL('https://delb.in');
            }}
            style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>About</Text>
          </Pressable>
        </View>
      </View>
      <ReactNativeModal
        style={styles.ReactModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="black"
        isVisible={showModal}
        onBackdropPress={toggleThemeModal}>
        <View style={styles.ThemeView}>
          <Text
            style={{
              color: theme === 'dark' ? '#BBBBBB' : colorScheme.lightTheme.dark,
              fontSize: 16,
              fontFamily: 'Inter-Medium',
              marginVertical: 20,
            }}>
            Select theme
          </Text>
          <View style={{flexDirection: 'row', columnGap: 15}}>
            <Pressable
              onPress={() => toggleTheme('dark')}
              style={[
                styles.ThemeButton,
                {
                  borderWidth: theme === 'dark' ? 1 : 0,
                },
              ]}>
              <Image
                style={styles.ThemeIcon}
                source={require('../../assets/images/icons/settings/dark-mode-icon.png')}
              />
              <Text style={styles.ThemeText}>Dark Mode</Text>
            </Pressable>
            <Pressable
              onPress={() => toggleTheme('light')}
              style={[
                styles.ThemeButton,
                {
                  borderWidth: theme === 'dark' ? 0 : 1,
                },
              ]}>
              <Image
                style={styles.ThemeIcon}
                source={require('../../assets/images/icons/settings/light-mode-icon.png')}
              />
              <Text style={styles.ThemeText}>Light Mode</Text>
            </Pressable>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default SettingsPage;

const createStyle = theme =>
  StyleSheet.create({
    ThemeView: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      paddingHorizontal: 15,
      paddingBottom: 35,
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      width: Dimensions.get('screen').width,
    },
    ReactModal: {
      margin: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    ThemeButton: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      width: '45%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 10,
      rowGap: 15,
      borderColor: colorScheme.lightTheme['pitch-grey'],
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['pitch-grey']
          : colorScheme.lightTheme['off-white'],
    },
    ThemeIcon: {
      width: 24,
      height: 24,
      tintColor: theme === 'dark' ? '#BBBBBB' : '#000000',
    },
    ThemeText: {
      color: theme === 'dark' ? '#BBBBBB' : colorScheme.lightTheme.dark,
    },
    SettingsView: {
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 15,
    },
    GoBack: {
      backgroundColor:
        theme === 'dark'
          ? colorScheme.darkTheme['primary-dark']
          : colorScheme.lightTheme['primary-light'],
      display: 'flex',
      flexDirection: 'row',
      gap: 13,
      paddingVertical: 10,
      borderBottomWidth: 0.7,
      borderColor:
        theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    GoBackIcon: {
      tintColor:
        theme === 'dark'
          ? colorScheme.darkTheme.light
          : colorScheme.darkTheme.dark,
      width: 25,
      height: 25,
    },
    GoBackText: {
      fontFamily: 'Inter-Medium',
      fontSize: 18,
      color:
        theme === 'dark'
          ? colorScheme.darkTheme['light']
          : colorScheme.lightTheme['dark'],
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
    SettingsText: {
      color:
        theme === 'dark'
          ? colorScheme.darkTheme['light']
          : colorScheme.lightTheme['dark'],
      fontSize: 17,
      fontFamily: 'Inter-Regular',
    },
  });
