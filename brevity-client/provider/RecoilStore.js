import {atom} from 'recoil';

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
});

export const newUser = atom({
  key: 'newUser',
  default: false,
});

export const listMembershipStatus = atom({
  key: 'listMembershipStatus',
  default: false,
});

export const UserLists = atom({
  key: 'UserLists',
  default: [],
});
