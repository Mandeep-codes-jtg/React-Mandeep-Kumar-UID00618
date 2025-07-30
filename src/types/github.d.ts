export interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  avatar_url: string;
  followers: number;
  following: number;
  location: string;
  bio: string;
  blog: string;
  email: string | null;
}
