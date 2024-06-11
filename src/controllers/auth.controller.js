import {User} from '../models/user.model.js';
import {ApiResponse, ApplicationError} from '../utils/index.js';



const register = async(req, res, next)=> {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            throw new ApplicationError(400, "All fields are required");
        }
        
        const user = await User.findOne({email}).select('-password')
        if(user) {
            throw new ApplicationError(400, "User already exist");
        }

        await User.create({name, email, password});
        return res.status(201)
        .json(new ApiResponse(200, user, "User registered"));
    } catch (error) {
        next(error);
    }
}



const login = async(req, res, next)=> {
    try {
      const {email, password} = req.body;
      if(!email || !password) {
        throw new ApplicationError(400, "Both fields are required");
      }

      const user = await User.findOne({email});
      if(!user) {
        throw new ApplicationError(401, "Invalid Credential");
      }

      const isPasswordCorrect = await user.isPasswordCorrect(password);

      if(!isPasswordCorrect) {
        throw new ApplicationError(401, "Password is incorrect");
      }

      // create token
      const token = await user.generateToken();
      const loginUser = await User.findOne({email}).select('-password');

      return res.status(200)
      .json(new ApiResponse(200, {loginUser, token}, 'Login successfull'));

    } catch (error) {
        next(error);
    }
}



export {
    register,
    login
}