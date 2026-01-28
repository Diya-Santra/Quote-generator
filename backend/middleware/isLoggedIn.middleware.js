import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token || req.cookies.accesstoken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
};

export default isLoggedIn;
