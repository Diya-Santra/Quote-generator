import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user register controller
export const userRegister = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
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

//admin register
export const adminRegister = async (req, res) => {
  const { email, password } = req.body;
  const adminAlreadyExist = await Admin.findOne({
    email,
  });
  if (adminAlreadyExist) {
    res.status(401).json({
      message: "Admin already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      id: admin._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "admin generated successfully",
    admin: {
      email: email,
    },
  });
};

//admin login
export const adminLoggIn = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({
    email,
  });
  if (!admin) {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Inavlid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: admin._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "admin logged in successfully",
    admin: {
      email: email,
    },
  });
};
