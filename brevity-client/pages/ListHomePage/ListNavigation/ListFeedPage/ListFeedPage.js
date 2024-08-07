// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Config from 'react-native-config';

// const ListFeedPage = ({listInfo}) => {
//   const URL = Config.BASE_URL;
//   const [listIssues, setListIssues] = useState([]);
//   const [isPressed, setIsPressed] = useState(false);
//   const navigation = useNavigation();

//   const defaultImage = require('../../../../assets/images/icons/issue-actions/unsolved-issue-default-icon.png');
//   const pressedImage = require('../../../../assets/images/icons/issue-actions/unsolved-issue-icon.png');

//   const handlePress = () => {
//     setIsPressed(!isPressed);
//   };

//   const getListIssues = async () => {
//     try {
//       const response = await axios.get(
//         `${URL}/api/get-list-issues/${listInfo.id}`,
//       );
//       if (response.status === 200) {
//         setListIssues(response.data);
//         console.log(response.data);
//       } else {
//         console.log(response.status);
//       }
//     } catch (error) {
//        Burnt.toast({
        title: 'Something went wrong!',
        preset: 'error',
        haptic: 'error',
        duration: 5,
        from: 'bottom',
      });
//     }
//   };

//   useEffect(() => {
//     getListIssues();
//   }, [listInfo.id]);

//   const renderItem = ({item, index}) => (
//     <Pressable style={styles.IssueComponent} key={`${item.id}-${index}`}>
//       <View style={styles.IssueHeader}>
//         <Pressable style={styles.IssueUserProfileModal}>
//           <Image
//             style={styles.HeaderImage}
//             source={require('../../../../assets/images/icons/user-default-image.png')}
//           />
//           <Text style={styles.HeaderUserName}>{item.name}</Text>
//         </Pressable>
//       </View>
//       <View style={styles.IssueContent}>
//         <Text style={styles.IssueTitle}>{item.title}</Text>
//         <Text style={styles.IssueText}>{item.body}</Text>
//       </View>
//       <View style={styles.IssueActionView}>
//         <View style={styles.IssueAction}>
//           <Pressable onPress={handlePress}>
//             <Image
//               style={styles.IssueActionIcon}
//               source={isPressed ? pressedImage : defaultImage}
//             />
//           </Pressable>
//           <Text style={styles.IssueActionCount}>12k</Text>
//         </View>
//         <View style={styles.IssueAction}>
//           <Image
//             style={styles.IssueActionIcon}
//             source={require('../../../../assets/images/icons/issue-actions/issue-solution-icon.png')}
//           />
//           <Text style={styles.IssueActionCount}>15</Text>
//         </View>
//         <View style={styles.IssueAction}>
//           <Image
//             style={styles.IssueActionIcon}
//             source={require('../../../../assets/images/icons/issue-actions/issue-reach-icon.png')}
//           />
//           <Text style={styles.IssueActionCount}>109</Text>
//         </View>
//         <View style={styles.IssueAction}>
//           <Image
//             style={styles.IssueActionIcon}
//             source={require('../../../../assets/images/icons/issue-actions/issue-share-icon.png')}
//           />
//         </View>
//       </View>
//     </Pressable>
//   );

//   return (
//     <FlatList
//       showsVerticalScrollIndicator={false}
//       data={listIssues}
//       keyExtractor={(item, index) => `${item.id}-${index}`}
//       renderItem={renderItem}
//     />
//   );
// };

// export default ListFeedPage;

// const styles = StyleSheet.create({
//   IssueComponent: {
//     borderBottomColor: 'rgba(0,0,0,0.06)',
//     backgroundColor: 'white',
//     borderBottomWidth: 1.3,
//     marginBottom: 15,
//   },
//   IssueHeader: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginVertical: 5,
//     alignItems: 'center',
//   },
//   HeaderImage: {
//     width: 20,
//     height: 20,
//     // width: 25,
//     // height: 25,
//     borderRadius: 100,
//     marginRight: 7,
//   },
//   HeaderUserName: {
//     color: 'black',
//     fontFamily: 'Inter-Medium',
//     // fontSize: 16,
//     fontSize: 14,
//   },
//   HeaderDivider: {
//     fontSize: 20,
//     color: '#687684',
//   },
//   HeaderListName: {
//     fontSize: 13.5,
//     color: '#687684',
//   },

//   IssueUserProfileModal: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   // Issue Content Styling
//   IssueContent: {rowGap: 5},
//   IssueTitle: {color: 'black', fontSize: 16.3, fontFamily: 'Inter-Medium'},
//   IssueText: {color: '#687684', fontSize: 16, lineHeight: 22},

//   // Issue Action Styling

//   IssueActionView: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   IssueAction: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     columnGap: 5,
//     marginVertical: 10,
//   },
//   IssueActionIcon: {width: 17, height: 17, objectFit: 'contain'},
//   IssueActionCount: {
//     color: 'black',
//     fontSize: 13.5,
//     fontFamily: 'Inter-Medium',
//   },
// });
