import jwt from 'jsonwebtoken';

export const onlyadminauthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(403).json({ error: 'Unauthorized: No token provided' });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded Token:", decodeToken);
    if (decodeToken.role === 'admin') {
      req.user = decodeToken;
      return next();
    } else {
      return res.status(403).json({ error: 'Unauthorized: Admins only' });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
