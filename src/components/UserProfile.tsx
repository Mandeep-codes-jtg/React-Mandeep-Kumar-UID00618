import { useSelector } from "react-redux"
import type { RootState } from "../store"
import type { GitHubUser } from "../types/github"
import UserDetailsComponent from "./UserDetailsComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProfile = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()

    const userData: GitHubUser = {
      avatar_url: auth.avatar_url,
      html_url: auth.html_url,
      login: auth.login,
      bio: auth.bio,
      blog: auth.blog,
      email: auth.email,
      followers: auth.followers,
      following: auth.following,
      id: auth.id,
      location: auth.location,
    };

    useEffect(()=>{
      if(!auth.login){
        navigate('/login')
      }
    },[auth,navigate])
    
  return (
    <div>
        <h2>My Profile</h2>
        <UserDetailsComponent user={userData} />
    </div>
  )
}

export default UserProfile
