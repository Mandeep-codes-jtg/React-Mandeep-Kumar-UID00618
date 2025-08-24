import { useEffect, useState } from "react"
import { getRandomSuggestions } from "../services/ListUsersService"
import { listFollowers } from "../services/ListFollowers"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store"
import { listFollowing } from "../services/ListFollowing"
import { follow } from "../services/FollowService"
import { unfollow } from "../services/UnfollowService"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import type { GitHubUser } from "../types/github"
import Cookies from "js-cookie"
import type { ButtonType } from "../types/types"

const SuggestionsPage = () => {
    const [users, setUsers] = useState<GitHubUser[]>([])
    const [followers, setFollowers] = useState<GitHubUser[]>([])
    const [following, setFollowing] = useState<GitHubUser[]>([])
    const [loading, setLoading] = useState(true)
    const [followingLoading, setFollowingLoading] = useState(true)
    const [followerLoading, setFollowerLoading] = useState(true)
    const [followProcessing, setFollowProcessing] = useState(false)
    const token = Cookies.get('token')
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const getSuggestions = async () => {
        setLoading(true)
        const response = await getRandomSuggestions(token)
        setUsers(response)
        setLoading(false)
    }
    const getFollowers = async () => {
        setFollowerLoading(true)
        const response = await listFollowers(token as string)
        setFollowers(response)
        setFollowerLoading(false)
    }
    const getFollowing = async () => {
        setFollowingLoading(true)
        const response = await listFollowing(token as string)
        setFollowing(response)
        setFollowingLoading(false)
    }
    const handleFollow = async (state: string, user: GitHubUser, token: string) => {
        if(followProcessing) return
        setFollowProcessing(true)
        if(state==='Unfollow') {
            try {
                await unfollow(user.login as string, token)
                const updatedFollowing = following.filter(item => item.login !== user.login)
                setFollowing(updatedFollowing)
                dispatch({type: 'DEC_FOLLOWING'})
            } catch (error) {
                if(error instanceof Error){
                    console.error(error)
                }
            }
        }
        else {
            try {
                await follow(user.login as string, token)
                setFollowing([...following,user])
                dispatch({type: 'INC_FOLLOWING'})
            } catch (error) {
                console.error('an error occured while processing your request: ', error)
            }
        }
        setFollowProcessing(false)
    }
    useEffect(()=>{
        if(!token) navigate('/login')
        getSuggestions()
        getFollowers()
        getFollowing()
    },[])
  return (
    <div>
        <h2>Suggestions</h2>
        {loading ? <Loader/> : users.map((user, index)=>{
            return (
                <div key={index} style={{border: '1px solid gray', margin: '10px', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={user.avatar_url} height={40} alt="avatar" />
                    <a href={user.html_url}>{user.login}</a>
                    <button style={{display: (followingLoading ? 'none' : "inline")}} onClick={(e)=>{handleFollow((e.target as ButtonType).textContent, user, token as string);}}>{following.some(item => item.login===user.login) ? 'Unfollow' : 'Follow'}</button>
                </div>
            )
        })}
        <br />
        <button onClick={getSuggestions} disabled={loading}>Refresh</button>
        <br />
        <br />
        <h2>My Followers</h2>
        {followerLoading ? <Loader/> : (!followers ? <p>nobody follows you</p> : followers.map((follower, index) => {
            return (
                <div key={index} style={{border: '1px solid gray', margin: '10px', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={(follower as GitHubUser).avatar_url} height={40} alt="avatar" />
                    <a href={(follower as GitHubUser).html_url}>{follower.login}</a>
                    <button style={{display: (followingLoading ? 'none' : "inline")}} onClick={(e)=>{handleFollow((e.target as ButtonType).textContent, follower, token as string);}}>{following.some((item: GitHubUser) => item.login===follower.login) ? 'Unfollow' : 'Follow'}</button>
                </div>
            )
        }))}
    </div>
  )
}

export default SuggestionsPage
