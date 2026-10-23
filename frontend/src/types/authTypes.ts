export interface LoginType {
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
}

export interface ErrorsType {
  username?: string[];
  email?: string[];
  password?: string[];
  confirm_password?: string[];
}

export interface AuthUserType {
  access: string;
  username?: string;
}

export interface AuthContextValueType {
  user: AuthUserType | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}
