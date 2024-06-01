import React from 'react'
import { useState, useEffect } from "react";
import { Container,Loader,PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
function EditPost() {
    const [post, setPost] = useState([]);
    const {slug}=useParams()
    const navigate=useNavigate()
    console.log("Edit slug: ",slug)
    useEffect(()=>{
        console.log("Edit slug in useEffect: ",slug)
        if(slug){
            console.log("In If slug")
                service.getPost(slug).then((post)=>{
                    console.log("Edit post:",post)
                    if(post){
                        console.log("In If Post");
                        setPost(post)
                    }
                })
        }else{
            navigate('/')
        }
    },[slug])
  return post ? (
  <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
  </div>) : <Loader></Loader>
}

export default EditPost