import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;


<<<<<<< HEAD
const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET,
        { expiresIn: '5h' })
=======
const generateToken = (payload)=> {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5h'})
>>>>>>> e1a00966dda4babb1bb4c618f0f311a626555782
    return token;
}

const verifyToken = (token) => {
<<<<<<< HEAD
    const payload = jwt.verify(token, JWT_SECRET);
=======
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> e1a00966dda4babb1bb4c618f0f311a626555782
    return payload;
}

export { generateToken, verifyToken }