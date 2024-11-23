import JWT from "jsonwebtoken";
import colors from "colors";
import userModel from "../models/userModel.js";

//Protect routes token base 
export const requireSignin = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // check if token exists
    if (!token) return res.status(401).send({ msg: "Acesso negado!" });

    // check if token is valid
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded._id).select("-password");

      next();
  
    } catch (error) {
    res.status(401).json({
      message: "Token inválido",
    });
  };
  
};

//Admin acess
export const isAdmin = async (req, res, next) => {
  try {

    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autorizado",
      });
    } else {
      next();
    }

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Acesso não autorizado",
    });
  }
}