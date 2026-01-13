import React, { useState, useEffect } from 'react'

function All_in_one() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const [posts, setPosts] = useState([]);

    // const [isEditing, setIsEditing] = useState(false); //for update only


    // READ -----------------------------------------
    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);


    // CREATE ---------------------------------------
    const addPost = (post) => {
        setPosts(prev => [...prev, post]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = { title, author };

        //SAVE THE NEW VALUE IN OUR DUMMY JSON API
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        }) // AFTER SAVING IN JSON - GET THE LATEST DATA FROM THE JSON - AND SAVE THE LATEST DATA IN STATE.
            .then(res => res.json())
            .then(data => {
                //Update state
                setPosts(prev => [...prev, data]); //ONCE STATE VALUE UPDATES - COMPONENT RE-RENDERS

                //Make the inputs Empty
                setTitle("");
                setAuthor("");
            });
    };


    // UPDATE -----------------------------
    const updatePost = (updatedPost) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
    };

    const handleUpdate = () => {
        const updatedPost = { ...post, title, author };

        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost),
        })
            .then(res => res.json())
            .then(data => {
                setPosts(prev =>
                    prev.map(el =>
                        el.id === data.id ? data : el //decode this line
                    )
                );
            
                // setIsEditing(false);
            });
    };



    console.log(posts)

    return (
        <>
            <h1>All CRUD operation in same component</h1>

            {/* Read */}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong> - {post.author}

                        {/* Update */}
                        <>
                            <input value={title} onChange={e => setTitle(e.target.value)} />
                            <input value={author} onChange={e => setAuthor(e.target.value)} />
                            <button onClick={handleUpdate}>Save</button>
                        </>
                    </li>
                ))}
            </ul>

            {/* Create */}
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    placeholder="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <button>Add</button>
            </form>
        </>
    )
}

export default All_in_one
