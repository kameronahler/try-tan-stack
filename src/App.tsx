import { useState } from 'react';
import './App.css';
import PostDetail from './PostDetail';
import PostsList from './PostsList';
import { CurrentPost } from './types';

function App() {
  const [currentPost, setCurrentPost] = useState<CurrentPost>(null);

  return (
    <>
      {currentPost !== null ? (
        <PostDetail currentPost={currentPost} setCurrentPost={setCurrentPost} />
      ) : (
        <PostsList setCurrentPost={setCurrentPost} />
      )}
    </>
  );
}

export default App;
