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
import Cookies from 'js-cookie';
import Loader from '../components/Loader';
import { suggest } from '../services/UserSuggestionsService';


const UserSearchPage = () => {
  const [user, setUser] = useState<GitHubUser>();
  const [isSearched, setIsSearched] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth)
  const [following, setFollowing] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<GitHubUser[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const token = Cookies.get('token')

  const handleSearch = async (query: string) => {
    if(loading) return
    try {
      setSuggestions([])
      setLoading(true)
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
      setLoading(false)
    }
  };

  const debounce = (func: (query: string)=>void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (query: string) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply({}, [query])
      }, delay);
    }
  }

  const getSuggestions = async (query: string) => {
    const trimmed = query.trim()
    if(loading || !trimmed) return
    try {
      const response = await suggest(trimmed)
      setSuggestions(response)
    } catch (error) {
      console.log('an error occured: ', error)
      setSuggestions([])
    }

  }

  const dsuggestions = debounce(getSuggestions, 500)

  const handleFollowAndUnfollow = async () => {
    try{

      if(!user || !user.login || !token || followLoading) 
          return 
      setFollowLoading(true)
      if(!following){
        await follow(user.login, token)
        setFollowing(true)
        dispatch({type: 'INC_FOLLOWING'})
        dispatch({type: 'INC_FOLLOWERS'})
      }
      else {
        await unfollow(user.login, token)
        setFollowing(false)
        dispatch({type: 'DEC_FOLLOWING'})
        dispatch({type: 'DEC_FOLLOWERS'})
      }
    }
    catch(error){
      alert('an error occured while processing your request')
      console.log(error)
    }
    finally {
      setFollowLoading(false)
    }
  }

  useEffect(()=>{
    const checkIfFollowing = async () => {
      try {
        if(!user || !user.login || !token) 
          return 
        await isFollowing(user.login, token as string)
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
      <SearchComponent onSearch={handleSearch} suggest={dsuggestions}/>
      {suggestions && suggestions.map((suggestion,index)=>{
        return (
          <div key={index} onClick={()=>{handleSearch(suggestion.login as string)}}>
            {suggestion.login}
          </div>
        )
      })}
      {isSearched && (user ? 
          (loading? (<Loader/>) : (<div>
            <UserDetailsComponent user={user} />
            {authUser.user && 
              <button onClick={()=>{handleFollowAndUnfollow()}} disabled={followLoading}>
                {following ? 'Unfollow' : 'Follow'}
              </button>
            }
          </div>))
           : 
          <p>No such user found</p>)
      }
    </div>
  );
};

export default UserSearchPage;
