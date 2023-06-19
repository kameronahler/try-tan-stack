import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';

const KEY_POSTS = 'posts';
const ENDPOINT_POSTS = 'http://localhost:3000/posts';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Posts = Post[];

const getPosts = async () => {
  const res = await axios.get<Posts>(ENDPOINT_POSTS);
  return res.data;
};

function App() {
  const postsQuery = useQuery({
    queryKey: [KEY_POSTS],
    queryFn: getPosts,
  });

  return (
    <>
      <h1>
        {postsQuery.isLoading && 'Loading'}
        {postsQuery.isError && `Error: ${JSON.stringify(postsQuery.error)}`}
        {postsQuery.isSuccess && 'Success'}
      </h1>
      <h2>Posts:</h2>
      <ol>
        {postsQuery.isSuccess &&
          postsQuery.data.map(({ id, title }) => <li key={id}>{title}</li>)}
      </ol>
    </>
  );
}

export default App;
