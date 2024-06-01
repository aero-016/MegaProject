import React from "react";
import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import {Loader} from "../components/index"
function AllPost() {
  console.log("In All Posts")
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      console.log(posts)
      if (posts) setPosts(posts.documents);
    });
  }, []);
  return posts.length!=0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : <Loader></Loader>
}

export default AllPost;
