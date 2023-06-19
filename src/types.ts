export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type CurrentPost = Pick<Post, 'body' | 'title'> | null;

export type Posts = Post[];

export interface PostsListProps {
  setCurrentPost: React.Dispatch<React.SetStateAction<CurrentPost>>;
}

export interface PostDetailProps {
  currentPost: CurrentPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CurrentPost>>;
}
