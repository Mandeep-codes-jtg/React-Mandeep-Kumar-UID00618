import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  INC_FOLLOWING,
  DEC_FOLLOWING,
} from '../actions/actions';
import { type AuthActionTypes } from '../actions/actions';
import type { GitHubUser } from '../types/github';
import { type AuthState } from '../types/types';

const initialState:AuthState = {
  isAuthenticated: false,
  user: null,
  html_url: '',
  avatar_url: '',
  login: null,
  bio: null,
  blog: null,
  email: null,
  followers: 0,
  following: 0,
  id: null,
  location: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: (action.payload as GitHubUser).login,
        avatar_url: (action.payload as GitHubUser).avatar_url,
        html_url: (action.payload as GitHubUser).html_url,
        login: (action.payload as GitHubUser).login,
        bio: (action.payload as GitHubUser).bio,  
        blog: (action.payload as GitHubUser).blog,
        email: (action.payload as GitHubUser).email,
        followers: (action.payload as GitHubUser).followers,
        following: (action.payload as GitHubUser).following,
        id: (action.payload as GitHubUser).id,
        location: (action.payload as GitHubUser).location,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        avatar_url: '',
        html_url: '',
        login: null,
        bio: null,
        blog: null,
        email: null,
        followers: 0,
        following: 0,
        id: null,
        location: null,
        loading: false,
        error: action.payload as string,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        avatar_url: '',
        html_url: '',
        login: null,
        bio: null,
        blog: null,
        email: null,
        followers: 0,
        following: 0,
        id: null,
        location: null,
        loading: false,
        error: null,
      };
    case INC_FOLLOWING:
      return {
        ...state,
        following: state.following + 1,
      };
    case DEC_FOLLOWING:
      return {
        ...state,
        following: state.following - 1,
      }
    default:
      return state
  }
};

export default authReducer;
