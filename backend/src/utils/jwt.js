import jwt from 'jsonwebtoken';

export const authenticate = (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return null;

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch {
    return null;
  }
};
