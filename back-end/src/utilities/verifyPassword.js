import bcrypt from "bcryptjs";

const verifyPassword = (password, hashPass) => {
    const verifyPass = bcrypt.compareSync(password, hashPass);
    return verifyPass;
}


export default verifyPassword;
