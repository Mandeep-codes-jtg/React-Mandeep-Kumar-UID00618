import { useEffect } from 'react';
import { type GitHubUser } from '../types/github';
import { useDispatch, useSelector } from 'react-redux';
import { init_followers } from '../actions/authActions';
import type { AppDispatch, RootState } from '../store';

interface GitHubSearchResponse {
  user: GitHubUser;
}


const UserDetailsComponent = ( {user} : GitHubSearchResponse) => {
  const dispatch = useDispatch<AppDispatch>()
  const followers = useSelector((state: RootState) => state.followers.followers)

  useEffect(()=>{
    dispatch(init_followers(user.followers));
  },[user, dispatch])

  return (
    <div>
      <img src={user.avatar_url} height={140}  alt="avatar" />
      {user.login && <div><span>Username: </span><a href={user.html_url}><span>{user.login}</span></a></div>}
      {user.bio && <div><span>Bio: </span><span>{user.bio}</span></div>}
      {user.location && <div><span>Location: </span><span>{user.location}</span></div>}
      {user.blog && <div><span>Blog: </span><span>{user.blog}</span></div>}
      {user.email && <div><span>Email: </span><span>{user.email}</span></div>}
      <div><span>Followers: </span><span>{followers}</span></div>
      <div><span>Following: </span><span>{user.following}</span></div>
    </div>
  );
};

export default UserDetailsComponent;
