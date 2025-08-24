import type { GitHubUser } from "./github";

export interface AuthState extends GitHubUser {
  isAuthenticated: boolean;
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
