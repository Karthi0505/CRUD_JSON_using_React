import { useState } from "react";

function UpdateList({ post, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);

  const handleUpdate = () => {
    const updatedPost = { ...post, title, author };

    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then(res => res.json())
      .then(data => {
        onUpdate(data);
        setIsEditing(false);
      });
  };

  if (!isEditing) {
    return <button onClick={() => setIsEditing(true)}>Edit</button>;
  }

  return (
    <>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={author} onChange={e => setAuthor(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
    </>
  );
}

export default UpdateList;
