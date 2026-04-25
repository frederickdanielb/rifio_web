export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: AuthUser;
  token: string;
}
