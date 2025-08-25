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
import { DEC_FOLLOWERS, DEC_FOLLOWING, INC_FOLLOWERS, INC_FOLLOWING } from '../actions/actions';


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
      const data = await fetchGitHubUser(query, token)
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
        dispatch({type: INC_FOLLOWING})
        dispatch({type: INC_FOLLOWERS})
      }
      else {
        await unfollow(user.login, token)
        setFollowing(false)
        dispatch({type: DEC_FOLLOWING})
        dispatch({type: DEC_FOLLOWERS})
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
        const statusCode = await isFollowing(user.login, token)
        if(statusCode === 404) {
          setFollowing(false)
        }
        else if (statusCode === 204) {
          setFollowing(true)
        }
      } catch (error) {
          console.error(error)
      }
    }
    checkIfFollowing()
  },[user, token])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>GitHub User Search</h2>
      <SearchComponent onSearch={handleSearch} suggest={dsuggestions}/>
      {suggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => {
        return (
              <div 
                key={suggestion.id || index}
                className="suggestion-item"
                onClick={() => handleSearch(suggestion.login as string)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSearch(suggestion.login as string);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #eee' }}
              >
                {suggestion.login}
              </div>
        )
      })}</div>)}
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
