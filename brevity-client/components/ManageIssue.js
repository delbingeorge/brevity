import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const ManageIssue = () => {
  const {
    params: {item},
  } = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.IssueComponent}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>
          {item.title.substring(0, 25) + '...'}
        </Text>
      </Pressable>
      <View>
        <View style={styles.IssueContent}>
          <Text style={styles.IssueTitle}>{item.title}</Text>
          <Text style={styles.IssueText}>{item.body}</Text>
        </View>
      </View>
    </View>
  );
};

export default ManageIssue;

const styles = StyleSheet.create({
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
  IssueComponent: {
    borderBottomColor: 'rgba(0,0,0,0.06)',
    backgroundColor: 'white',
    borderBottomWidth: 1.3,
    // paddingVertical: 10,
    marginBottom: 15,
    // marginVertical: 8,
    flex: 1,
    paddingHorizontal: 15,
  },
  IssueHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderImage: {
    width: 20,
    height: 20,
    // width: 25,
    // height: 25,
    borderRadius: 100,
    marginRight: 7,
  },
  HeaderUserName: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    // fontSize: 16,
    fontSize: 14,
  },
  HeaderDivider: {
    fontSize: 20,
    color: '#687684',
  },
  HeaderListName: {
    fontSize: 13.5,
    color: '#687684',
  },

  IssueUserProfileModal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Issue Content Styling
  IssueContent: {rowGap: 5},
  IssueTitle: {color: 'black', fontSize: 16.3, fontFamily: 'Inter-Medium'},
  IssueText: {color: '#687684', fontSize: 16, lineHeight: 22},

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
    columnGap: 5,
    marginVertical: 10,
  },
  IssueActionIcon: {width: 17, height: 17, objectFit: 'contain'},
  IssueActionCount: {
    color: 'black',
    fontSize: 13.5,
    fontFamily: 'Inter-Medium',
  },
});
