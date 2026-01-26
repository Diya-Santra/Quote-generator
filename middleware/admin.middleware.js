import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.cookies.accesstoken
    
    console.log(token);
    
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (!decoded.id) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token"
      })
    }

    const user = await User.findById(decoded.id)
    
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found"
      })
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden - Only admin allowed"
      })
    }

    req.userId = decoded.id
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token"
    })
  }
}

