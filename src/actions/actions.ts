import type { GitHubUser } from "../types/github";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const INC_FOLLOWING = 'INC_FOLLOWING';
export const DEC_FOLLOWING = 'DEC_FOLLOWING';

export const INC_FOLLOWERS = 'INC_FOLLOWERS';
export const DEC_FOLLOWERS = 'DEC_FOLLOWERS';
export const INIT_FOLLOWERS = 'INIT_FOLLOWERS';

interface LoginSuccessResponse extends GitHubUser {
  token: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessResponse;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string|null; 
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface IncFollowing {
  type: typeof INC_FOLLOWING;
}

interface DecFollowing {
  type: typeof DEC_FOLLOWING;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | IncFollowing
  | DecFollowing;

interface IncFollowers {
  type: typeof INC_FOLLOWERS;
}

interface DecFollowers {
  type: typeof DEC_FOLLOWERS;
}

interface InitFollowers {
  type: typeof INIT_FOLLOWERS;
  payload: number;
}

export type FollowerActionTypes =
  | IncFollowers
  | DecFollowers
  | InitFollowers;
