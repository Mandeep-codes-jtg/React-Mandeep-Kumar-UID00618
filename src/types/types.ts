import type { GitHubUser } from "./github";

export interface AuthState extends GitHubUser {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
}

export interface FollowerState {
  followers: number;
}
