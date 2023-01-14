import { UserDataType, WordDataType } from './../redux/dataTypes';
export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = {
  passwordConfirm: string;
} & LoginUserDto;

export type ResponseUserData = {
  user: UserDataType;
  engAppToken: string;
};

export type CreateNewWord = Pick<WordDataType, 'eng' | 'nat' | 'group'>;

export type CreateNewGroup = Pick<CreateNewWord, 'group'>;

export type ErrorPayloadType = {
  statusCode: number;
  message: string;
};
