import type { Request, Response, NextFunction } from 'express';
import { UserUsecase } from '../../usecase/user_usecase';
import type { User } from '../../domain/user';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authMiddleware = (userUsecase: UserUsecase) => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'whatever') as { userId: string };
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token, userId not found' });
    }

    const user = await userUsecase.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
