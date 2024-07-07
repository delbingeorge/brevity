import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import ListFeedPage from './ListNavigation/ListFeedPage/ListFeedPage';
import ListInsights from './ListNavigation/ListInsights/ListInsights';
import ListRanking from './ListNavigation/ListRanking/ListRanking';

const ListHomePage = () => {
  const [renderComponent, setRenderComponent] = useState('ListFeedPage');
  const data = useRoute();
  const navigation = useNavigation();
  const {item} = data.params;
  const [listJoin, setListJoin] = useState(false);

  const ListJoinLogic = () => {
    setListJoin(!listJoin);
    console.log('Clicked!');
  };

  const renderViewLogic = () => {
    switch (renderComponent) {
      case 'ListFeedPage':
        return <ListFeedPage />;
      case 'ListRankings':
        return <ListRanking />;
      case 'ListInsights':
        return <ListInsights />;
      default:
        return <ListFeedPage />;
    }
  };

  return (
    <View style={styles.ListHomePageView}>
      {/* <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.GoBack}>
        <Image
          style={styles.GoBackIcon}
          source={require('../../assets/images/icons/go-back-bk.png')}
        />
        <Text style={styles.GoBackText}>{item.list_name}</Text>
      </Pressable> */}
      <View>
        <View style={styles.ListHeader}>
          <Text style={styles.ListTitle}>{item.list_name}</Text>
          <Pressable>
            <Image
              style={styles.ListSettings}
              source={require('../../assets/images/icons/list-settings-icon-bk.png')}
            />
          </Pressable>
        </View>
        <View>
          <Text style={styles.ListDescription}>{item.description}</Text>
        </View>
        <View style={styles.HeaderIconView}>
          <View style={styles.ListHeaderIcons}>
            <Image
              style={styles.HeaderIcon}
              source={require('../../assets/images/icons/list-icons/list-member-count.png')}
            />
            <Text style={styles.HeaderIconText}>10k</Text>
          </View>
          <View style={styles.ListHeaderIcons}>
            <Image
              style={styles.HeaderIcon}
              source={require('../../assets/images/icons/list-icons/solved-issue-default-icon.png')}
            />
            <Text style={styles.HeaderIconText}>10k</Text>
          </View>
          <View style={styles.ListHeaderIcons}>
            <Image
              style={styles.HeaderIcon}
              source={require('../../assets/images/icons/list-icons/unsolved-issue-default-icon.png')}
            />
            <Text style={styles.HeaderIconText}>30k</Text>
          </View>
        </View>
        <Pressable onPress={ListJoinLogic}>
          <Text
            style={{
              backgroundColor: listJoin == true ? 'rgba(0,0,0,1)' : 'black',
              paddingVertical: 10,
              borderRadius: 8,
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Inter-Medium',
              fontSize: 15,
            }}>
            {listJoin == true ? 'Joined' : 'Join List'}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          marginVertical: 13,
          width: '100%',
          height: 1.1,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}></View>

      <View style={styles.ListNav}>
        <Pressable
          onPress={() => setRenderComponent('ListFeedPage')}
          style={
            renderComponent == 'ListFeedPage'
              ? styles.ActiveListNavText
              : styles.ListNavButton
          }>
          <Text style={styles.ListNavText}>Feeds</Text>
        </Pressable>
        <Pressable
          onPress={() => setRenderComponent('ListRankings')}
          style={
            renderComponent == 'ListRankings'
              ? styles.ActiveListNavText
              : styles.ListNavButton
          }>
          <Text style={styles.ListNavText}>Ranking</Text>
        </Pressable>
        <Pressable
          onPress={() => setRenderComponent('ListInsights')}
          style={
            renderComponent == 'ListInsights'
              ? styles.ActiveListNavText
              : styles.ListNavButton
          }>
          <Text style={styles.ListNavText}>Insights</Text>
        </Pressable>
      </View>
      <View>{renderViewLogic()}</View>
    </View>
  );
};

export default ListHomePage;

const styles = StyleSheet.create({
  ListHomePageView: {flex: 1, backgroundColor: 'white', paddingHorizontal: 15},
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingVertical: 4,
    borderBottomWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  ListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  ListTitle: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 22,
  },
  ListSettings: {
    width: 20,
    height: 20,
  },
  ListDescription: {
    color: '#2E3540',
    lineHeight: 22,
    fontSize: 16,
    marginVertical: 3,
  },
  HeaderIconView: {
    //     width: '65%',
    marginVertical: 8,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ListHeaderIcons: {flexDirection: 'row', columnGap: 7, alignItems: 'center'},
  HeaderIcon: {width: 18, height: 18},
  HeaderIconText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },

  ListNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ActiveListNavText: {
    borderRadius: 8,
    backgroundColor: '#f5f7f9',
  },

  ListNavText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    paddingVertical: 6,
    borderRadius: 8,
    paddingHorizontal: 25,
    fontSize: 14,
    borderColor: '#F5F7F9',
    borderWidth: 1,
    textAlign: 'center',
  },

  GoBackIcon: {
    width: 25,
    height: 25,
  },
  GoBackText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: 'black',
  },
});