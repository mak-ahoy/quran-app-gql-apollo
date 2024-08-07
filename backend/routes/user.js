import express from "express"
import { deleteUser, getUsers, loginUser, registerUser, updateUser } from "../controllers/user.js";
import { getSurahVerses, getSurahs } from "../controllers/content.js";

export const userRouter = express.Router();




userRouter.get("/hello", (req, res, next)=>{res.status(200).json({message: "hello world"})})
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/get-surahs', getSurahs);
userRouter.get('/get-users', getUsers);
userRouter.post('/get-surahs/surah-info', getSurahVerses);
userRouter.patch('/update-user', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);



