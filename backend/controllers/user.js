import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { saveImageToFile } from "../utils/save_image.js";
import { config } from "dotenv";

config({
    path: "./config.env",
  });

// Create a new user

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);;

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  
  return false;
}

function anyValueIsEmpty(obj) {
  for (let key in obj) {
    // console.log(key + ': ' + obj[key]); // Logging to see each property and value
    if (Object.prototype.hasOwnProperty.call(obj, key) && isEmpty(obj[key])) {
      // console.log('Found an empty value: ', key); // Log which key is empty
      return true; // Found an empty value
    }
  }
  return false; // No empty values found
}

export const registerUser = async (_,{ email, username, password, confirm_pass, file }) => {
  try{


  if (!email || !username || !password || !confirm_pass) {
    return ({
      success:false,
      message: "please provide all fields",
    });
  }


  if (password!== confirm_pass) {
    return ({
      success:false,
      message: "passwords dont match",
    });
  }

  const user_exists = await User.findOne({ where: { email: email, username: username } });


  if (user_exists){
    return ({
      success:false,
      message: "user already exist try with a different username or email"
    })
  }


  const encrypted_pass = await bcrypt.hash(password, saltRounds);

  const response = await saveImageToFile(file)

  const user = await User.create({
    email: email,
    username: username,
    password: encrypted_pass,
    profile_picture: response.filename
  });

  return ({
    success:true,
    message: "User created successfully",
    user: user,
    filename: response.filename
  });
  
} catch (error) {

  console.log(error.message)
  return ({
    success:false, 
    message: "An exception occurred",
    filename: "null"
  });
}
};

export const loginUser = async (_, { email, password}) => {
  try {
    console.log(email)

    if (!email || !password) {
      return ({
        success:false,
        message: "Please provide all fields",
      });
    }

    console.log(email , 2)

    let user = await User.findOne({ where: { email: email } });


    if (user == null) {
      return ({
        success:false,
        message: "No user by email found",
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return ({
        success: false, 
        message: "Invalid password",
      });
    }



    let token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.secretKey,
      { expiresIn: "1h" }
    );
    

    return ({
      success:true,
      message: "User validated",
      token: token,
      username: user.username,
      profile_picture: user.profile_picture 
    });



  } catch (error) {
    return ({
      success: false, 
      message: "An exception occurred",
    });
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return ({
        success: false,
        message: "No user found",
      });
    }


    return ({
      success:true,
      message: "User fetched successfully",
      users
    });


  } catch (error) {
    return ({
      success:false,
      message: "An exception occurred",
      users: []
    });
  }
};

export const updateUser = async (_,{content}) => {
  try {


    if (!content || !Object.prototype.hasOwnProperty.call(content, 'id')) {
      return ({
        success: false,
        message: "id is required field"
      });
    }

    if (anyValueIsEmpty(content)) {
      return ({
        success: false,
        message: "fields cannot be empty"
      });
    }


    if (content.password){
      const encrypted = await bcrypt.hash(content.password, saltRounds);
      content = {...content, password:encrypted}
    }
    

    let user = await User.findOne({ where: { id: content.id } });

    if (user == null) {
        return ({
          success: false, 
          message: "No user by id found"
        });
      }

    await user.update(content);

    return ({
      success:true,
      message: "user updated sucessfully",
      user

    });
  } catch (error) {
    return ({
      success:false,
      message: "An exception occurred",
    });
  }
};

export const deleteUser = async (_, {id}) => {
  try {

    if (!id) {
      return ({
        success: false,
        message: "no user info available",
      });
    }

    let user = await User.findOne({ where: { id: id } });

    if (user == null){
      return ({
         success: false,
         message: "no user by id found"
        })
    }

    await user.destroy();


      return ({
        success:true,
        message: "user deleted sucessfully",
        user 
      });
 
  } catch (error) {
    return ({
      success:false,
      message: "An exception occurred",
      
    });
  }
};

