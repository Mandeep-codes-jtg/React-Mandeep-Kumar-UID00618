import {
  INC_FOLLOWERS,
  DEC_FOLLOWERS,
  INIT_FOLLOWERS
} from '../actions/actions';
import { type FollowerActionTypes } from '../actions/actions';
import { type FollowerState } from '../types/types';

const initialState: FollowerState = {
    followers: 0
}

const followersReducer = (state: FollowerState = initialState, action: FollowerActionTypes): FollowerState => {
    switch (action.type) {
        case INC_FOLLOWERS:
            return {
                ...state,
                followers: state.followers + 1,
            }

        case DEC_FOLLOWERS:
            return {
                ...state,
                followers: state.followers - 1,
            }

        case INIT_FOLLOWERS:
            return {
                ...state,
                followers: action.payload,
            }
    
        default:
            return state;
    }
}

export default followersReducer;
