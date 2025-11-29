import jwt from 'jsonwebtoken';
import { handleError } from '../helpers/handleErr.js'; 

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(handleError(403, "Unauthorized: No token provided"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;

    next();
  } catch (error) {
    next(handleError(401, error.message || "Token verification failed"));
  }
};
