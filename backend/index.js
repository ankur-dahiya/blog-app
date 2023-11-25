import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"../frontend/public/upload");
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file = req.file;
    return res.status(200).json(file.filename);
})

app.use("/api/posts",postRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/users",userRoutes);

app.listen(5000,()=>{
    console.log("Server is running");
})