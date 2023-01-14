import {
  ResponseUserData,
  LoginUserDto,
  RegisterUserDto,
  CreateNewGroup,
  ErrorPayloadType,
} from './types';
import { AxiosInstance } from 'axios';

export const userApi = (instance: AxiosInstance) => ({
  async getMe() {
    const { data } = await instance.get<null, { data: ResponseUserData }>(
      '/auth/me',
    );

    return data;
  },
  async login(userDto: LoginUserDto) {
    const { data } = await instance.post<
      LoginUserDto,
      { data: ResponseUserData }
    >('/auth/login', userDto);

    return data;
  },

  async register(userDto: RegisterUserDto) {
    const { data } = await instance.post<
      RegisterUserDto,
      { data: ResponseUserData }
    >('/auth/register', userDto);

    return data;
  },

  async addUserGroup(groupDto: CreateNewGroup) {
    const { data } = await instance.post<
      CreateNewGroup,
      { data: { group: string } }
    >('/user/group', groupDto);

    return data;
  },

  async removeUserGroup(group: string) {
    const { data } = await instance.delete<
      string,
      { data: { group: string; wordsCount: number } }
    >('/user/group/' + group);

    return data;
  },

  async recoverPasswordMail(dto: Pick<LoginUserDto, 'email'>) {
    const { data } = await instance.post<
      Pick<LoginUserDto, 'email'>,
      { data: ErrorPayloadType }
    >('/auth/forgotpassword', dto);

    return data;
  },

  async changePassword(dto: Omit<RegisterUserDto, 'email'>) {
    const { data } = await instance.post<
      Omit<RegisterUserDto, 'email'>,
      { data: ResponseUserData }
    >('/auth/recover', dto);

    return data;
  },

  async activateUser() {
    const { data } = await instance.get<
      null,
      { data: Pick<ResponseUserData, 'user'> }
    >('/user/activate');

    return data;
  },

  async makeUserVip(dto: { code: string }) {
    const data = await instance.post<{ code: string }, null>(
      '/code/activate',
      dto,
    );

    return data;
  },

  async resendConfirmMail() {
    const data = await instance.get('/auth/resend');

    return data;
  },
});
