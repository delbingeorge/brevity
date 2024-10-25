// Module imports
import axios from 'axios';
import React, {useState} from 'react';
import * as Burnt from 'burnt';
import Config from 'react-native-config';
import {Switch} from 'react-native-switch';
import ReactNativeModal from 'react-native-modal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ManageIssue = () => {
  const {
    params: {item},
  } = useRoute();
  const navigation = useNavigation();
  const URL = Config.BASE_URL;
  const [isEnabled, setIsEnabled] = useState(false);
  const [showIssueMenu, setShowIssueMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const newState = !previousState;
      setIssueStatus(newState);
      return newState;
    });
  };

  const setIssueStatus = async status => {
    try { 
      const response = await axios.post(
        `${URL}/api/set-issue-status/${item.issueId}`,
        {
          isEnabled: status,
        },
      );
      Burnt.toast({
        title: 'Status Updated!',
        preset: 'success',
        haptic: 'success',
        duration: 5,
        from: 'bottom',
      });
    } catch (error) {
      Burnt.toast({
        title: 'Failed to update status!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
      setIsEnabled(false);
    }
  };

  const removeIssueHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${URL}/api/delete-issue/${item.issueId}`,
      );
      if (response.status == 200) {
        Burnt.toast({
          title: 'Issue Removed!',
          preset: 'error',
          haptic: 'error',
          duration: 5,
          from: 'bottom',
        });
        // navigation.navigate('PostedIssues');
        navigation.goBack();
      }
    } catch (err) {
      Burnt.toast({
        title: 'Manage issues smww!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
    } finally {
      setLoading(false);
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
          <ScrollView>
            <Text style={[styles.IssueText, {marginBottom: 300}]}>
              {item.body}
            </Text>
          </ScrollView>
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
                <Text style={styles.ModalText}>Close this issue</Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 11,
                    fontFamily: 'Inter-Medium',
                  }}>
                  Danger zone
                </Text>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    height: 0.5,
                    width: '75%',
                  }}></View>
              </View>
              <View style={styles.ModalItems}>
                <View>
                  <Text style={[styles.ModalText, {color: 'red'}]}>
                    Delete issue
                  </Text>
                  <Text style={{fontSize: 13, color: 'rgba(0,0,0,0.5)'}}>
                    Remember this action is irreversible!
                  </Text>
                </View>
                <Pressable onPress={removeIssueHandler}>
                  {loading === true ? (
                    <ActivityIndicator />
                  ) : (
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        marginHorizontal: 15,
                        tintColor: 'red',
                      }}
                      source={require('../assets/images/icons/remove-icon-bk.png')}
                    />
                  )}
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
    height: '100%',
    borderBottomWidth: 1.3,
    marginBottom: 15,
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
    fontSize: 15.5,
    fontFamily: 'Inter-Medium',
  },
  ModalItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
