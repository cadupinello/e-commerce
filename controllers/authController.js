import colors from "colors";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// helper function
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {

    const { name, email, password, phone, address, answer } = req.body;

    console.log(name, email, password, phone, address)

    if (!name || name == "") {
      return res.status(400).send({ msg: "Nome é obrigatório!" });
    }

    if (!email || email == "") {
      return res.status(400).send({ msg: "Email é obrigatório!" });
    }

    if (!password || password == "") {
      return res.status(400).send({ msg: "Senha é obrigatório!" });
    }

    if (!address || address == "") {
      return res.status(400).send({ msg: "Address é obrigatório!" });
    }

    if (!answer || answer == "") {
      return res.status(400).send({ msg: "Resposta é obrigatório!" });
    }

    // check user exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log(`User with email ${email} already exists!`.bgRed.bold);

      return res.status(200).send({
        success: false,
        msg: "Usuário já cadastrado, faça login!",
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create new user
    const user = await new userModel({
      name, 
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    console.log(`${colors.green("[registerController]")} - ${colors.green("Usuário cadastrado com sucesso!")}`);
   
    return res.status(201).send({
      success: true,
      msg: "Usuário cadastrado com sucesso!",
      user,
    });

  }catch(err){
    console.log(`${colors.red("[registerController]")} - ${colors.red(err.message)}`);

    res.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    })
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
  
    if (!email || email == "") {
      return res.status(400).send({ msg: "Email é obrigatório!" });
    }

    if (!answer || answer == "") {
      return res.status(400).send({ msg: "Answer é obrigatório!" });
    }

    if (!newPassword || newPassword == "") {
      return res.status(400).send({ msg: "New password é obrigatório!" });
    }

    // check user exists
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(400).send({ msg: "Usuário não encontrado!" });
    } 

    // hash password
    const hashedPassword = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      msg: "Senha alterada com sucesso!",
    });

  } catch (err) {
    console.log(err.bgRed);
  
    res.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    })
  }
}

export const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;

    //validation
    if (!email || email === "" || !password || password === "") {
      return res.status(422).send({ success: false, msg: "Email e senha são obrigatórios!" });
    }

    // check user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(422).send({ success: false, msg: "Usuário não encontrado!" });
    }

    // check password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(422).send({ success: false, errors: ["Senha incorreta!"] });
    }

    // create token
    const token = JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(`${colors.bgGreen("[registerController]")}`);

    return res.status(200).send({
      success: true,
      msg: "Usuário logado com sucesso!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    })

    }catch(err){
    console.log(`${colors.bgRed("[registerController]")}, ${err}`);

    res.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    })
  };
};

export const testController = async (req, res) => {
  try {
    console.log(`${colors.green("[registerController]")}`);
    return res.status(200).send({
      success: true,
      msg: "Usuário logado com sucesso!",
    })
    
  }catch(err){
      console.log(`${colors.bgRed("[testController]")}, ${err}`);
    }
}