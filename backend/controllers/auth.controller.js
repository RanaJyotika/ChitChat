import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genrateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {

        const {fullName, userName, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"Username already exit"});
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        // console.log("Salt generated:", salt);

        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log("Password hashed:", hashedPassword);

        // https://avatar-placeholder.iran.liara.run/

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            // generate JWT tokens
            genrateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })
        } else {
            res.status(400).json({error:"Invalid user data"});
        }
        
    } catch (error) {
        console.log("error in signup contlroller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async (req,res) => {
   try {

    const {userName, password} = req.body;

    const user = await User.findOne({userName});

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
        return res.status(400).json({error: "Invalid username or password"});
    }

    genrateTokenAndSetCookie(user._id, res);

     res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });

   } catch (error) {
    console.log("error in login contlroller", error.message)
        res.status(500).json({error: "Internal Server Error"})
   }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("error in logout contlroller", error.message)
        res.status(500).json({error: "Internal Server Error"})
   }
}
   

