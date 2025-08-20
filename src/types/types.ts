import type { GitHubUser } from "./github";

export interface AuthState extends GitHubUser {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
    username: string;
    token: string;
    avatar_url: string;
}

export interface FollowerState {
  followers: number;
}
