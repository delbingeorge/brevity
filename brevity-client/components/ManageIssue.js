import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const ManageIssue = () => {
  const {
    params: {item},
  } = useRoute();
  const navigation = useNavigation();

  const [isPressed, setIsPressed] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showIssueMenu, setShowIssueMenu] = useState(false);

  const defaultImage = require('../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
  const pressedImage = require('../assets/images/icons/issue-actions/unsolved-issue-icon.png');

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.IssueComponent}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Image
            style={styles.GoBackIcon}
            source={require('../assets/images/icons/go-back-bk.png')}
          />
          <Text style={styles.GoBackText}>
            {item.title.substring(0, 15) + '...'}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setShowIssueMenu(true);
          }}>
          <Image
            style={{width: 22, height: 22}}
            source={require('../assets/images/icons/menu-icon-bk.png')}
          />
        </Pressable>
      </Pressable>
      <View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueTitle}>{item.title}</Text>
          <Text style={styles.IssueText}>{item.body}</Text>
        </View>
      </View>

      {showIssueMenu && (
        <ReactNativeModal
          style={styles.ReactModal}
          isVisible={showIssueMenu}
          animationIn={'slideInUp'}
          animationOut={'slideInDown'}
          onBackdropPress={() => setShowIssueMenu(false)}>
          <View style={styles.AuthView}>
            <View>
              <View style={styles.ModalItems}>
                <Text style={styles.ModalText}>Mark as solved</Text>
                <Switch
                  trackColor={{false: 'grey', true: 'grey'}}
                  thumbColor={isEnabled ? 'lightgreen' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View style={styles.ModalItems}>
                <Text style={styles.ModalText}>Delete</Text>
                <Image
                  style={{width: 22, height: 22, marginHorizontal: 15}}
                  source={require('../assets/images/icons/remove-icon-bk.png')}
                />
              </View>
            </View>
          </View>
        </ReactNativeModal>
      )}
    </View>
  );
};

export default ManageIssue;

const styles = StyleSheet.create({
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5,
    borderBottomWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  IssueComponent: {
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    marginBottom: 15,
    flex: 1,
    paddingHorizontal: 15,
  },

  // Issue Content Styling

  IssueContent: {rowGap: 5},
  IssueTitle: {color: 'black', fontSize: 16.3, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 16, lineHeight: 22},

  // Issue Action Button

  IssueActionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 30,
  },
  IssueAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 17, height: 17, objectFit: 'contain'},
  IssueActionCount: {
    color: 'black',
    fontSize: 13.5,
    fontFamily: 'Inter-Medium',
  },
  ReactModal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  AuthView: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
  },
  ModalText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  ModalItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
