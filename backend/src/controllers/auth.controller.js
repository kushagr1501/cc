import User from "../models/user.schema.js";
import asyncHandler from '../service/asyncHandler.js'
import { upload, uploadToCloudinary } from '../service/cloudinary.js';

const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}
export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "please enter all details"
        })
    }
    const existinguser = await User.findOne({ email });
    if (existinguser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const user = await User.create({
        name,
        email,
        password
    })

    let token = user.getJWTtoken();

    user.password = undefined;
    res.cookie("token", token.cookieOption)


    res.status(201).json({
        success: true,
        message: "user created succesfully",
        token,
        user
    })

})

export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "please enter all details"
        })
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "user does not exists"
        })

    }
    const comparePass = await existingUser.comparePassword(password)
    if (!comparePass) {
        return res.status(400).json({
            success: false,
            message: "entered pass is wrong"
        })
    }

    let token = existingUser.getJWTtoken();
    existingUser.password = undefined

    res.cookie("token", token, cookieOption)

    res.status(200).json({
        success: true,
        message: "logged in sucessfully",
        token,
        existingUser
    })


})


  
export const updateAvatar = asyncHandler(async (req, res) => {
    // Ensure file upload handling is done via middleware
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }

        try {
            // Ensure we have the user
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            let imageUrl = user.avatar; 
            console.log(imageUrl);
            
            // If a file is uploaded, upload to Cloudinary
            if (req.file) {
                imageUrl = await uploadToCloudinary(req.file);  // Assuming this uploads the file and returns the URL
            }

            // Update user's avatar field
            user.avatar = imageUrl;

            await user.save();  // Save the updated user

            res.status(200).json({
                success: true,
                message: 'Avatar updated successfully',
                avatar: imageUrl  // Return new avatar URL
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating avatar', error: error.message });
        }
    });
});
export const Logout=asyncHandler(async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"log out sucess"
    })
})

export const getProfile=asyncHandler(async (req,res)=>{
    const user=req.user
    if(!user)
    {
        return res.status(400).json({
            success:false,
            message:"no user found"
        })
    }
    res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        user
    }); 
    
})


export const getAllProfile = asyncHandler(async (req, res) => {
    const users = await User.find({ role: { $ne: 'admin' } });
    if (!users || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No users found"
      });
    }
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      users
    });
  });
  