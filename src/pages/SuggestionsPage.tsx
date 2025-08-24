import { useEffect, useState } from "react"
import { getRandomSuggestions } from "../services/ListUsersService"
import { listFollowers } from "../services/ListFollowers"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { listFollowing } from "../services/ListFollowing"
import { follow } from "../services/FollowService"
import { inc_following } from "../actions/authActions"
import type { GitHubUser } from "../types/github"

const SuggestionsPage = () => {
    const [users, setUsers] = useState<GitHubUser[]>([])
    const [followers, setFollowers] = useState<GitHubUser[]>([])
    const [following, setFollowing] = useState<GitHubUser[]>([])
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch<AppDispatch>()
    const getSuggestions = async () => {
        const response = await getRandomSuggestions()
        setUsers(response)
        console.log('suggestions: ', response)
    }
    const getFollowers = async () => {
        if(!token) return
        const response = await listFollowers(token as string)
        setFollowers(response)
        console.log('followers: ', response)
    }
    const getFollowing = async () => {
        if(!token) return
        const response = await listFollowing(token as string)
        setFollowing(response)
        console.log('following: ', response)
    }
    const handleFollow = async (user: GitHubUser) => {
    if (!token) {
        console.warn('No token available; cannot follow.');
        return;
    }
    const isAlreadyFollowing = following?.some(item => item.login === user.login);
    if (isAlreadyFollowing) return;
    try {
        await follow(user.login as string, token as string);
        setFollowing(prev =>
            prev.some(item => item.login === user.login) ? prev : [...prev, user]
        );
        dispatch(inc_following());
    } catch (error) {
        console.error('An error occurred while processing your request:', error);
    }
    }
    useEffect(()=>{
        getSuggestions()
        getFollowers()
        getFollowing()
    },[])
  return (
    <div>
        <h2>Suggestions</h2>
        {users && users.map((user, index)=>{
            return (
                <div key={index} style={{border: '1px solid gray', margin: '10px', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={user.avatar_url} height={40} alt="avatar" />
                    <a href={user.html_url}>{user.login}</a>
                    <button
                      onClick={() => handleFollow(user)}
                      disabled={!token || following.some(item => item.login === user.login)}
                    >
                      {following.some(item => item.login === user.login) ? 'Following' : 'Follow'}
                    </button>
                </div>
            )
        })}
        <br />
        <button onClick={getSuggestions}>Refresh</button>
        <br />
        <br />
        <h2>My Followers</h2>
        {followers.map((follower, index) => {
            return (
                <div key={index} style={{border: '1px solid gray', margin: '10px', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={follower.avatar_url} height={40} alt="avatar" />
                    <a href={follower.html_url}>{follower.login}</a>
                    <button
                      onClick={() => handleFollow(follower)}
                      disabled={!token || following.some(item => item.login === follower.login)}
                    >
                      {following.some(item => item.login === follower.login) ? 'Following' : 'Follow'}
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default SuggestionsPage
