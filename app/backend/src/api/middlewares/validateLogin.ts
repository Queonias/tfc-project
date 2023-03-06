import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization');
  const secret = 'jwt_secret';

  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    verify(token, secret);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
