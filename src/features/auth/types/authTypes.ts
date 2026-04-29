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
  id: string;
  nombre: string;
  email: string;
  token: string;
  tokenExpira: string;
}

export interface RegisterRequestDto {
  nombre: string;
  email: string;
  password: string;
}
