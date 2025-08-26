export interface GitHubUser {
  login: string | null;
  id: number | null;
  html_url: string;
  avatar_url: string;
  followers: number;
  following: number;
  location: string | null;
  bio: string | null;
  blog: string | null;
  email: string | null;
}
