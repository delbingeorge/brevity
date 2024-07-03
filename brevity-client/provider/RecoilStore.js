// import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from 'recoil';

// const persistAtom = key => {
//   return ({setSelf, onSet}) => {
//     setSelf(
//       AsyncStorage.getItem(key).then(savedValue =>
//         savedValue != null ? JSON.parse(savedValue) : new DefaultValue(),
//       ),
//     );

//     onSet(newValue => {
//       if (newValue instanceof DefaultValue) {
//         AsyncStorage.removeItem(key);
//       } else {
//         AsyncStorage.setItem(key, JSON.stringify(newValue));
//       }
//     });
//   };
// };

export const authState = atom({
  key: 'authState',
  default: false,
});

export const modalView = atom({
  key: 'modalView',
  default: false,
});

export const userInfo = atom({
  key: 'userInfo',
  default: {},
  // effects_UNSTABLE: [persistAtom('userInfo')],
});

export const newUser = atom({
  key: 'newUser',
  default: {},
});
