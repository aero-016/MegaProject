import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, Loader, PostCard } from "../components";
function Home() {
  console.log("In Home page")
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length == 0 ) {
    return (
      <div className="w-full  text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {authStatus ? <Loader></Loader> : 'Login to read posts'}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
