import User from "../models/user.schema.js";
import asyncHandler from '../service/asyncHandler.js'
import config from "../config/index.js";
import JWT from 'jsonwebtoken'


export const isLoggedIn = asyncHandler(async (req, res, next) => { 
    let token;
    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")))
        token = req.cookies.token || req.headers.authorization.split(" ")[1]

    if (!token) {
        throw new Error("not authorized")
    }

    try {
        let decodedPayload = JWT.verify(token, config.JWT_SECRET)
        req.user = await User.findById(decodedPayload._id, "name email role")

    } catch (error) {
        throw new Error("not authorized")
    }
    next();

})

export const authorized = (...Roles) => asyncHandler(async (req, res, next) => {
    if (!Roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized" });
    }
    next();
});