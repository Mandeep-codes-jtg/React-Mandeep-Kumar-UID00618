import { type GitHubUser } from '../types/github';

interface GitHubSearchResponse {
  user: GitHubUser;
}


const UserDetailsComponent = ( {user} : GitHubSearchResponse) => {
  if(!user) return <p>No user found</p>;

  return (
    <div>
      <img src={user.avatar_url} height={140}  alt="" />
      {user.login && <div><span>Username: </span><a href={user.html_url}><span>{user.login}</span></a></div>}
      {user.bio && <div><span>Bio: </span><span>{user.bio}</span></div>}
      {user.location && <div><span>Location: </span><span>{user.location}</span></div>}
      {user.blog && <div><span>Blog: </span><span>{user.blog}</span></div>}
      {user.email && <div><span>Email: </span><span>{user.email}</span></div>}
      <div><span>Followers: </span><span>{user.followers}</span></div>
      <div><span>Following: </span><span>{user.following}</span></div>
    </div>
  );
};

export default UserDetailsComponent;
