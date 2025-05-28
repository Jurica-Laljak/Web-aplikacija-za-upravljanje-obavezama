export interface UserAccessToken {
  accesstoken: string;
}

export interface UserTokens extends UserAccessToken {
  refreshtoken: string;
}

export interface UserDataDto extends UserTokens {
  todoids: number[];
}
