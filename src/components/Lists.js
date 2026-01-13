import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

function Lists({ posts, onUpdate, onDelete }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong> - {post.author}
          <UpdateList post={post} onUpdate={onUpdate} />
          <DeleteList id={post.id} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default Lists;
