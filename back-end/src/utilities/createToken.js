import jwt from "jsonwebtoken";

const createToken = (payload, exp) => {
    const token = jwt.sign(payload, process.env.JWT_SECRECT, {
        expiresIn : exp
    });
    return token;
}

export default createToken;
