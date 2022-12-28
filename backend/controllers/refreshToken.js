import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { storeUser } from "./users.js";
 
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401); //unuthorized, browser doesnt have stored cookies
        const user = await User.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403); //forbidden, browser have cookies, but no user with the token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.student_id;
            const username = user.username;
            const email = user.email;
            storeUser(userId, email, username, user.dp, user.class_group, user.role);
            const accessToken = jwt.sign({userId,  username, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });

            res.json({ accessToken }); //if refresh token verified, give access token
        });
    } catch (error) {
        console.log(error);
    }
}