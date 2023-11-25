import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Home() {
    const [posts,setPosts] = useState([]);
    const cat = useLocation().search;

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get("/posts"+cat);
                setPosts(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[cat])
    // let posts = [
    //     {
    //         id:1,
    //         title: "Lorem ipsum dolor sit amet consectetur.",
    //         desc: "adipisicing elit. Dolor dolore quisquam laudantium similique tenetur laborum ducimus aperiam obcaecati at enim, delectus hic corporis minima!",
    //         img: "https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id:2,
    //         title: "Lorem ipsum dolor sit amet consectetur.",
    //         desc: "adipisicing elit. Dolor dolore quisquam laudantium similique tenetur laborum ducimus aperiam obcaecati at enim, delectus hic corporis minima!",
    //         img: "https://images.pexels.com/photos/18844140/pexels-photo-18844140/free-photo-of-building-of-natwest-bank-in-llandudno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id:3,
    //         title: "Lorem ipsum dolor sit amet consectetur.",
    //         desc: "adipisicing elit. Dolor dolore quisquam laudantium similique tenetur laborum ducimus aperiam obcaecati at enim, delectus hic corporis minima!",
    //         img: "https://images.pexels.com/photos/18888635/pexels-photo-18888635/free-photo-of-honda-motorcycle-on-roadside-in-woods.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id:4,
    //         title: "Lorem ipsum dolor sit amet consectetur.",
    //         desc: "adipisicing elit. Dolor dolore quisquam laudantium similique tenetur laborum ducimus aperiam obcaecati at enim, delectus hic corporis minima!",
    //         img: "https://images.pexels.com/photos/18670675/pexels-photo-18670675/free-photo-of-lake-in-a-mountain-valley-during-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     }
    // ]
    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html,"text/html");
        return doc.body.textContent;
    }
  return (
    <div className='home'>
        <div className="posts">
            {posts.map((post)=>(
                <div className="post" key={post.id}>
                    <div className="img">
                        <img src={"../upload/"+post.img} alt="post img"/>
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                            <p>{getText(post.desc)}</p>
                            <button>Read More</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home