export type WordDataType = {
  id: string;
  eng: string;
  nat: string;
  group: string;
  createdAt: string;
};

export type UserDataType = {
  id: number;
  email: string;
  groups: string[];
  isConfirm: boolean;
  isVip: boolean;
  words: number;
  createdAt: string;
};
