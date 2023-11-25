import React, { useContext, useEffect, useState } from 'react'
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from "moment";
import AuthContext from '../context/authContext';

function Single() {
    const[post,setPost] = useState({});
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const postId = useLocation().pathname.split("/")[2];
    const handleDelete = async ()=>{
        try{
            await axios.delete("/posts/"+postId);
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }

    const getText = (html)=>{
        const doc = new DOMParser().parseFromString(html,"text/html");
        return doc.body.textContent;
    }

    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const res = await axios.get("/posts/"+postId);
                setPost(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetch();
    },[postId]);
  return (
    <div className='single'>
        <div className="content">
            <img src={post && "../upload/"+post.img} alt='post image'/>
            <div className="user">
                {post.userImg && <img src={post.userImg}/>}
                <div className="info">
                    <span>{post.username}</span>
                    <p>{moment(post.date).fromNow()}</p>
                </div>
                {currentUser?.username === post.username && (<div className="edit">
                    <Link to={`/write?edit=1`} state={post}><img src={Edit}/></Link>
                    <img onClick={handleDelete}src={Delete}/>
                </div>)}
            </div>
            <h1>{post.title}</h1>
            {getText(post.desc)}
        </div>
        <Menu cat={post.cat}/>
    </div>
  )
}

export default Single