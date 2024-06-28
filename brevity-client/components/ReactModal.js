import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const ReactModal = () => {
  return (
    <ReactNativeModal
      style={styles.ReactModal}
      isVisible={true}
      backdropColor="black">
      <View style={styles.AuthView}>
        <Text style={styles.AuthTitle}>Sign In</Text>
        <Text style={styles.AuthSubTitle}>
          Authenticate yourself to continue using bervity.
        </Text>
        <View style={styles.AuthInnerView}>
          <TouchableOpacity style={styles.AuthBtn}>
            <Image
              style={styles.AuthServiceLogo}
              source={require('../assets/images/icons/github-icon.png')}
            />
            <Text style={styles.AuthBtnText}>Github</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.AuthBtn}>
            <Image
              style={styles.AuthServiceLogo}
              source={require('../assets/images/icons/google-icon.png')}
            />
            <Text style={styles.AuthBtnText}>Google</Text>
          </TouchableOpacity>
        </View>
        <Pressable>
          <Text style={styles.SubText}>I don’t want to sign in</Text>
        </Pressable>
      </View>
    </ReactNativeModal>
  );
};

export default ReactModal;

const styles = StyleSheet.create({
  IssueComponent: {
    borderBottomColor: '#D9D9D9',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    paddingVertical: 10,
    // marginVertical: 8,
    paddingHorizontal: 15,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  HeaderUserName: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  HeaderDivider: {
    fontSize: 27,
    color: '#687684',
  },
  HeaderListName: {
    fontSize: 15,
    color: '#687684',
  },

  IssueUserProfileModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Issue Content Styling
  IssueContent: {rowGap: 5},
  IssueTitle: {color: 'black', fontSize: 18, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 17, lineHeight: 24},

  // Issue Action Styling

  IssueActionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IssueAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 20, height: 20},
  IssueActionCount: {color: 'black', fontSize: 16, fontFamily: 'Inter-Medium'},
  AuthView: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    // height: Dimensions.get('screen').height / 2.9,
    width: Dimensions.get('screen').width,
  },
  AuthInnerView: {
    marginTop: 15,
  },
  AuthTitle: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
  },
  AuthSubTitle: {
    color: '#39404A',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  AuthServiceLogo: {
    width: 26,
    height: 26,
    objectFit: 'contain',
  },
  AuthBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    gap: 8,
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  AuthBtnText: {color: 'black', fontSize: 19, fontFamily: 'Inter-Medium'},
  SubText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    marginTop: 15,
    textAlign: 'center',
  },
  ReactModal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
