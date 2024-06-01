import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log("POST :" ,post)
    console.log("userData :" ,userData)
    console.log("isAuthor :" ,isAuthor)
    useEffect( () =>{ async function fetch() {
        if (slug) {
          await appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }
    fetch()

    }, [slug, navigate,userData,useSelector ]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-3 bg-gray-100 min-h-screen">
        <Container>
            <div className="w-full flex flex-col items-center mb-6 relative border rounded-xl p-4  bg-white">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

                <div className="relative w-full flex justify-center mb-6">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-64 w-auto"
                    />

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <h2 className="text-xl font-semibold text-gray-500 mb-2">Content</h2>
                <div className="w-full max-w-7xl">
                    <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-6">
                        
                        <div className="text-gray-700 leading-relaxed">
                            {post?.content ? parse(post?.content):null}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
    ) :<Loader></Loader>
}