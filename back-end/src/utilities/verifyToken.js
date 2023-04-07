import jwt from "jsonwebtoken";

const verifyToken = (payload) => {
    const token = jwt.verify(payload, process.env.JWT_SECRECT);
    return token;
}

export default verifyToken;
