import jwt from'jsonwebtoken';

const JWT_SECRET = 'jdjkjhkdhj9ux';

const generateToken = (payload)=> {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '5h'})
    return token;
}

const verifyToken = (token) => {
    const payload =  jwt.verify(token, JWT_SECRET);
    return payload;
}

export {generateToken, verifyToken}