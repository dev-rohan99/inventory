import bcrypt from "bcryptjs";

const genPassword = (password) => {
    const genSalt = bcrypt.genSaltSync(10);
    const genHashPass = bcrypt.hashSync(password, genSalt);
    return genHashPass;
}


export default genPassword;
