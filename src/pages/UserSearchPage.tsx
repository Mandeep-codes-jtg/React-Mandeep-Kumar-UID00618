import { useState } from 'react';
import axios from 'axios';
import SearchComponent from '../components/SearchComponent';
import UserDetailsComponent from '../components/UserDetailsComponent';
import { type GitHubUser } from '../types/github';


const UserSearchPage = () => {
  const [user, setUser] = useState<GitHubUser>();
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<GitHubUser>(
        `https://api.github.com/users/${encodeURIComponent(query)}`
      );
      setUser(response.data);
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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>GitHub User Search</h2>
      <SearchComponent onSearch={handleSearch} />
      {isSearched && (user ? <UserDetailsComponent user={user} /> : <p>No such user found</p>)}
    </div>
  );
};

export default UserSearchPage;
