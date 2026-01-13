function DeleteList({ id, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteList;
