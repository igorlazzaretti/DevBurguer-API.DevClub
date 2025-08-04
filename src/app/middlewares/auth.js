import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

function authMiddleware(req, response, next) {
    console.log('AuthMiddleware called');
    const authToken = req.headers.authorization;
    console.log('Auth token: ', authToken);

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split(' ')[1];
    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error('Token invalid');
            }
            console.log('Decoded token: ', decoded);
            req.userId = decoded.id;
            req.userName = decoded.name;
        });
    } catch (err) {
        return response.status(401).json({ error: 'Token invalid' });
    }
    return next();
}
export default authMiddleware;