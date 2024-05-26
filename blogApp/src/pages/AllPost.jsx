import React from "react";
import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
function AllPost() {
  console.log("In All Posts")
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
