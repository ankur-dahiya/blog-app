import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get("/posts?cat="+cat);
                setPosts(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[cat]);
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
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={"../upload/"+post.img}/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu