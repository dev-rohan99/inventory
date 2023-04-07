import userModel from "../../models/user/userModel.js";
import createError from "../../utilities/createError.js";
import createToken from "../../utilities/createToken.js";
import genPassword from "../../utilities/genPassword.js";
import { isEmail, isPhone } from "../../utilities/validation.js";
import verifyPassword from "../../utilities/verifyPassword.js";

/**
 * user register
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const register = async (req, res, next) => {
    try{

        const { email, phone, password } = req.body;

        const findEmailUser = await userModel.findOne({email : email});
        if(findEmailUser){
            return next(createError(400, "This email already exist! Please enter another email!"));
        }

        const findPhoneUser = await userModel.findOne({phone : phone});
        if(findPhoneUser){
            return next(createError(400, "This phone No. already exist! Please enter another phone No.!"));
        }

        const user = await userModel.create({
            ...req.body,
            password : genPassword(password)
        });

        if(!user){
            return next(createError(400, "Please try again!"));
        }

        if(user){
            return res.status(200).json({
                status : "Successfull!",
                user : user
            });
        }

    }catch(err){
        return next(err);
    }
}

/**
 * user login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const login = async (req, res, next) => {
    try{

        const { phoneOrEmail, password } = req.body;

        if(isEmail(phoneOrEmail)){

            const findEmailUser = await userModel.findOne({email : phoneOrEmail});
            if(!findEmailUser){
                return next(createError(400, "You are not register yet!"));
            }else{
                if(!verifyPassword(password, findEmailUser.password)){
                    return next(createError(400, "Password not matched! Try again."));
                }else{
                    const token = createToken({id : findEmailUser._id}, "365d");

                    return res.status(200).cookie("accessToken", token).json({
                        status : "Successfull!",
                        user : findEmailUser
                    });
                }
            }

        }else if(isPhone(phoneOrEmail)){

            const findPhoneUser = await userModel.findOne({phone : phoneOrEmail});
            if(!findPhoneUser){
                return next(createError(400, "You are not register yet!"));
            }else{
                if(!verifyPassword(password, findPhoneUser.password)){
                    return next(createError(400, "Password not matched! Try again."));
                }else{
                    const token = createToken({id : findPhoneUser._id}, "365d");

                    return res.status(200).cookie("accessToken", token).json({
                        status : "Successfull!",
                        user : findPhoneUser
                    });
                }
            }

        }else{
            return next(createError(400, "Invalid phone or email address! Try again."));
        }

    }catch(err){
        return next(err);
    }
}

/**
 * user profile update
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const profileUpdate = async (req, res, next) => {
    try{

        const {id} = req.params;
        const updateUser = await userModel.updateOne(id, req.body);
        
        if(!updateUser){
            return next(createError(400, "Profile update failed! Try again."))
        }

        if(updateUser){
            return res.status(200).json({
                message : "Profile updated successfull!",
                user : updateUser
            });
        }

    }catch(err){
        return next(err);
    }
}


