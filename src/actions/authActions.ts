import { type Dispatch } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  INC_FOLLOWING,
  DEC_FOLLOWING,
  type FollowerActionTypes,
  INC_FOLLOWERS,
  DEC_FOLLOWERS,
  INIT_FOLLOWERS
} from '../actions/actions';
import { type AuthActionTypes } from '../actions/actions';
import { loginUsingPAT } from '../services/LoginService';
import type { GitHubUser } from '../types/github';


export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const data: GitHubUser = await loginUsingPAT(username, password);
    dispatch({ type: LOGIN_SUCCESS, payload: {...data, token: password} });
  } catch (error: unknown) {
    dispatch({ type: LOGIN_FAILURE, payload: error ? error.toString() : null });
  }
  finally {
    console.log('request completed/failed')
  }
};

export const logout = () => (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGOUT });
};

export const inc_following = () => (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: INC_FOLLOWING });
};

export const dec_following = () => (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: DEC_FOLLOWING });
}

export const inc_followers = () => (dispatch: Dispatch<FollowerActionTypes>) => {
  dispatch({ type: INC_FOLLOWERS });
}

export const dec_followers = () => (dispatch: Dispatch<FollowerActionTypes>) => {
  dispatch({ type: DEC_FOLLOWERS });
}

export const init_followers = (followers: number) => (dispatch: Dispatch<FollowerActionTypes>) => {
  dispatch({ type: INIT_FOLLOWERS, payload: followers });
}
