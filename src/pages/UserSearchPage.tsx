import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchComponent from '../components/SearchComponent';
import UserDetailsComponent from '../components/UserDetailsComponent';
import { type GitHubUser } from '../types/github';
import { fetchGitHubUser } from '../services/GithubUserSearchService';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { isFollowing } from '../services/IsFollowingService';
import { follow } from '../services/FollowService';
import { unfollow } from '../services/UnfollowService';
import { dec_followers, dec_following, inc_followers, inc_following } from '../actions/authActions';


const UserSearchPage = () => {
  const [user, setUser] = useState<GitHubUser>();
  const [isSearched, setIsSearched] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth)
  const [following, setFollowing] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleSearch = async (query: string) => {
    try {
      const data = await fetchGitHubUser(query)
      setUser(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.message);setUser(undefined);
      } else {
        console.error('Unexpected error:', error);
      }
      
    } finally {
      setIsSearched(true)
    }
  };

  const handleFollowAndUnfollow = async () => {
    try{
      if(!user || !user.login || !authUser || !authUser.token) 
          return 
      if(!following){
        await follow(user.login, authUser.token)
        setFollowing(true)
        dispatch(inc_following())
        dispatch(inc_followers())
      }
      else {
        await unfollow(user.login, authUser.token)
        setFollowing(false)
        dispatch(dec_following())
        dispatch(dec_followers())
      }
    }
    catch(error){
      alert('an error occured while processing your request')
      console.log(error)
    }
  }

  useEffect(()=>{
    const checkIfFollowing = async () => {
      try {
        if(!user || !user.login || !authUser || !authUser.token) 
          return 
        await isFollowing(user.login, authUser.token)
        setFollowing(true)
      } catch (error) {
        if(axios.isAxiosError(error) && error.status==404){
          setFollowing(false)
        }
        else 
          console.error(error)
        
      }
    }
    checkIfFollowing()
  },[user])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>GitHub User Search</h2>
      <SearchComponent onSearch={handleSearch} />
      {isSearched && (user ? 
          <div>
            <UserDetailsComponent user={user} />
            {authUser.user && 
              <button onClick={()=>{handleFollowAndUnfollow()}} >
                {following ? 'Unfollow' : 'Follow'}
              </button>}
          </div>
           : 
          <p>No such user found</p>)}
    </div>
  );
};

export default UserSearchPage;
