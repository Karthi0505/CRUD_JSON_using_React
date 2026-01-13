import { useEffect, useState } from "react";
import CreateList from "./CreateList";
import Lists from "./Lists";

function App() {
  const [posts, setPosts] = useState([]);

  // READ
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // CREATE
  const addPost = (post) => {
    setPosts(prev => [...prev, post]);
  };

  // UPDATE
  const updatePost = (updatedPost) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  // DELETE
  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2>React CRUD App</h2>

      <CreateList onAdd={addPost} />
      <Lists
        posts={posts}
        onUpdate={updatePost}
        onDelete={deletePost}
      />
    </div>
  );
}

export default App;
