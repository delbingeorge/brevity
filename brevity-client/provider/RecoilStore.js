import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from 'recoil';

const persistAtom = key => {
  return ({setSelf, onSet}) => {
    setSelf(
      AsyncStorage.getItem(key).then(savedValue =>
        savedValue != null ? JSON.parse(savedValue) : new DefaultValue(),
      ),
    );

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        AsyncStorage.removeItem(key);
      } else {
        AsyncStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
};

//   effects_UNSTABLE: [persistAtom('persistCounter')],

export const authState = atom({
  key: 'authState', 
  default: true, 
});
