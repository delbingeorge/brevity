import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AchievementItem = ({title, description, level}) => {
  const getBackgroundColor = () => {
    switch (level) {
      case 0:
        return '#4747FF';
      case 1:
        return '#7747FF';
      case 2:
        return '#FF47D1';
      case 3:
        return '#FFB347';
      default:
        return '#333333';
    }
  };

  const getIcon = () => {
    switch (level) {
      case 0:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/get-started.png')}
            style={styles.iconImage}
          />
        );
      case 1:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/get-started.png')}
            style={styles.iconImage}
          />
        );
      case 2:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/at-your-service.png')}
            style={styles.iconImage}
          />
        );
      case 3:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/get-started.png')}
            style={styles.iconImage}
          />
        );
      case 4:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/ninja.png')}
            style={styles.iconImage}
          />
        );
      case 5:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/god-mode.png')}
            style={styles.iconImage}
          />
        );
      case 6:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/epic-compiler.png')}
            style={styles.iconImage}
          />
        );
      default:
        return (
          <Image
            source={require('../../assets/images/icons/rank-icons/get-started.png')}
            style={styles.iconImage}
          />
        );
    }
  };

  return (
    <View style={styles.achievementContainer}>
      <View
        style={[styles.iconContainer, {backgroundColor: getBackgroundColor()}]}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.achievementDescription}>{description}</Text>
      </View>
    </View>
  );
};

const ProfileRank = () => {
  const navigation = useNavigation();

  const achievements = [
    {
      title: 'Get Started',
      description:
        'Kick start your debugging journey by solving public hosted issues.',
      level: 0,
    },
    {
      title: 'At your service',
      description:
        'Awarded to users who solved issues which helped over 15 users.',
      level: 1,
    },
    {
      title: 'Debugger',
      description:
        'Awarded to users who solved issues which helped over 45 users.',
      level: 2,
    },
    {
      title: 'Nerd ✨',
      description:
        'Awarded to users who solved issues which helped over 75 users.',
      level: 3,
    },
    {
      title: 'Ninja',
      description:
        'Awarded to users who solved issues which helped over 225 users.',
      level: 4,
    },
    {
      title: 'God Mode',
      description:
        'Awarded to users who solved issues which helped over 945 users.',
      level: 5,
    },
    {
      title: 'Epic Compiler',
      description:
        'Awarded to users who solved issues which helped over 1905 users.',
      level: 6,
    },
  ];

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingBottom: 5,
        }}>
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
            <Text style={styles.GoBackText}>Brevity Journey </Text>
          </Pressable>
          <Text style={styles.SubTitleText}>
            Solve hosted issues and earn badges, prefixes, special features and
            more.
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={index}
            title={achievement.title}
            description={achievement.description}
            level={achievement.level}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default ProfileRank;

const styles = StyleSheet.create({
  TitleText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 3,
  },
  SubTitleText: {
    color: '#39404A',
    lineHeight: 22,
    fontSize: 17,
  },
  GoBack: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    paddingTop: 5,
    paddingBottom: 3,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  achievementContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    gap: 5,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 20,
  },
  achievementTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 19,
  },
  iconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
});
