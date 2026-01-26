import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user register controller
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const profilePicture = req.file.filename;
  
  const isUserAlreadyExist = await User.findOne({
    email,
  });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture,
    role: "user", 
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User generated successfully",
    user: {
      name: name,
      email: email,
      profilePicture: profilePicture,
    },
  });
  console.log(req.file);
  console.log(req.body);
};

//user login controller
export const userLoggIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Inavlid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "LoggedIn successfully",
    user: {
      name: user.name,
      email: email,
    },
  });
};



//admin login
export const adminLoggIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await User.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check if user is admin
    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Access denied - Only admins can login here",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
    );
    
    res.cookie("token", token);

    res.status(200).json({
      message: "Admin logged in successfully",
      admin: {
        email: email,
        name: admin.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
