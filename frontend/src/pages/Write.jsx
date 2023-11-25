import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Write() {

    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    const navigate = useNavigate();

    const upload = async()=>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            const res = await axios.post("/upload",formData);
            return res.data;
        }
        catch(err){
            console.log(err);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const imgUrl = file ? await upload() : state ? state.img : "";
        try{
            state? await axios.put("/posts/"+state.id,{
                title,desc:value,cat,img:imgUrl,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            }) : await axios.post("/posts/",{
                title,desc:value,cat,img:imgUrl,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            });
        }
        catch(err){
            console.log(err);
        }
        // navigate("/");
    }
  return (
    <div className='add'>
        <div className="content">
            <input type="text" placeholder='title' onChange={e=>setTitle(e.target.value)} value={title}/>
            <div className="editorContainer">
                <ReactQuill className='editor' theme="snow" value={value} onChange={setValue}/>
            </div>
        </div>
        <div className="menu">
            <div className="item">
                <h1>Publish</h1>
                <span>
                    <b>Status: </b> Draft
                </span>
                <span>
                    <b>Visibility: </b> Public
                </span>
                <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
                <label className="file" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>Save as a draft</button>
                    <button onClick={handleSubmit}>Pubish</button>
                </div>
            </div>
            <div className="item">
                <h1>Category</h1>
                <div className="cat">
                <input type="radio" checked={cat==="art"} id="art" name="cat" value="art"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="art">Art</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat==="science"} id="science" name="cat" value="science"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="science">Science</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat==="technology"} id="technology" name="cat" value="technology"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="technology">Technology</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat==="cinema"} id="cinema" name="cat" value="cinema"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="cinema">Cinema</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat==="design"} id="design" name="cat" value="design"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="design">Design</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat==="food"} id="food" name="cat" value="food"onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="food">Food</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Write;