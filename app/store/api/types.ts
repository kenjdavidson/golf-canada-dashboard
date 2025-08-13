import { User } from "../auth/types";

// Common response types will be defined here
export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  errors?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  expire_date: string;
  user: User;
}

// Add more types as we define endpoints
