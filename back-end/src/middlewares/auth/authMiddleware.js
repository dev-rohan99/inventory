import createError from "../../utilities/createError.js";
import verifyToken from "../../utilities/verifyToken.js";

export const userAuthenticate = (req, res, next) => {
    try{

        const token = req.cookies.accessToken;
        if(!token){
            return next(createError(400, "You are not authenticated! Please sign up."))
        }

        const loginUser = verifyToken(token);
        if(!loginUser){
            return next(createError(401, 'Invalid token!'));
        }

        if(loginUser){
            req.user = loginUser;
            next();
        }

    }catch(err){
        return next(err);
    }
}



