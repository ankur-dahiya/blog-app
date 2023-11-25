import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {SECRET} from "../util/constants.js"

export const register = (req,res)=>{
    
    // check existing user
    const q = "SELECT * FROM users WHERE email=? or username=?";
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err){return res.json(err);}
        if(data.length){
            return res.status(409).json("User already exists!");
        }
        // Hash the password and create a user
        let salt = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(req.body.password,salt);

        const QSaveUser = "INSERT INTO users (username,email,password) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashPass
        ]

        db.query(QSaveUser,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    });
}
export const login = (req,res)=>{
    // Check User
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(!data.length) return res.status(404).json("User not found!");

        // Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("wrong username or password!");

        const token = jwt.sign({id:data[0].id},SECRET);
        const {password,...other} = data[0];

        res.cookie("access_token",token,{httpOnly:true}).status(200).json(other);
    })
}
export const logout = (req,res)=>{
    return res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out");
}