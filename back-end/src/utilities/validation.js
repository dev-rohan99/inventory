

export const isEmail = (email) => {
    const checkMail = /^[a-z0-9-_\.]{1,}@[a-z0-9]{1,}\.[a-z\.]{2,}$/.test(email);
    return checkMail;
}

export const isPhone = (phone) => {
    const checkPhone = /^(01|\+8801|8801)[0-9]{9}$/.test(phone);
    return checkPhone;
}

