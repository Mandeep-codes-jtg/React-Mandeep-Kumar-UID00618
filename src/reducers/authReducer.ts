import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  INC_FOLLOWING,
  DEC_FOLLOWING,
} from '../actions/actions';
import { type AuthActionTypes } from '../actions/actions';
import { type AuthState } from '../types/types';

const initialState: AuthState = {
  isAuthenticated: false,
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

const authReducer= (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        avatar_url: action.payload.avatar_url,
        html_url: action.payload.html_url,
        login: action.payload.login,
        bio: action.payload.bio,  
        blog: action.payload.blog,
        email: action.payload.email,
        followers: action.payload.followers,
        following: action.payload.following,
        id: action.payload.id,
        location: action.payload.location,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
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
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
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
        following: Math.max(0, state.following - 1),
      }
    default:
      return state;
  }
};

export default authReducer;
