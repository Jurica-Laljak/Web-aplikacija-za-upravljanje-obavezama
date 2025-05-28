export type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  toDoListIds: string;
  setToDoListIds: (idArrayStringified: string) => void;
};
