import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import ReactNativeModal from 'react-native-modal';
import {Switch} from 'react-native-switch';

const ManageIssue = () => {
  const {
    params: {item},
  } = useRoute();
  const navigation = useNavigation();
  const URL = Config.BASE_URL;
  const [isPressed, setIsPressed] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showIssueMenu, setShowIssueMenu] = useState(false);

  const removeIssueHandler = async () => {
    try {
      const response = await axios.delete(
        `${URL}/api/delete-issue/${item.issueId}`,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const setIssueStatus = async () => {
    try {
      const response = await axios.post(`${URL}/api/set-issue-status/`);
    } catch (error) {
       Burnt.toast({
        title: 'Something went wrong!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    }
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
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  disabled={false}
                  circleSize={25}
                  barHeight={25}
                  circleBorderWidth={2}
                  circleBorderInactiveColor="#c0c0c0"
                  circleBorderActiveColor="lightgreen"
                  backgroundActive={'#F6F6F6'}
                  backgroundInactive={'#F6F6F6'}
                  circleActiveColor={'lightgreen'}
                  circleInActiveColor={'#c0c0c0'}
                  changeValueImmediately={true}
                  innerCircleStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}
                />
              </View>
              <View style={styles.ModalItems}>
                <View>
                  <Text style={[styles.ModalText, {color: 'red'}]}>
                    Delete issue
                  </Text>
                  <Text style={{fontSize: 14, color: 'rgba(0,0,0,0.5)'}}>
                    Remember this action is irreversible!
                  </Text>
                </View>
                <Pressable onPress={removeIssueHandler}>
                  <Image
                    style={{
                      width: 22,
                      height: 22,
                      marginHorizontal: 15,
                      tintColor: 'red',
                    }}
                    source={require('../assets/images/icons/remove-icon-bk.png')}
                  />
                </Pressable>
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
    paddingVertical: 10,
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
  },
  ModalText: {
    color: 'black',
    fontSize: 17.5,
    fontFamily: 'Inter-Medium',
  },
  ModalItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
