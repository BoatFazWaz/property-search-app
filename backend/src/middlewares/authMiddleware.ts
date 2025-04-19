import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next(); // No token provided, continue as unauthenticated
    }
    
    const token = authHeader.split(' ')[1]; // Bearer TOKEN format
    if (!token) {
      return next();
    }
    
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const decoded = jwt.verify(token, secret) as { 
      userId: string;
      email: string;
      role: string;
    };
    
    if (!decoded) {
      return next();
    }
    
    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user) {
      return next();
    }
    
    // Attach user to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    
    next();
  } catch (error) {
    // Invalid token or other error
    console.error('Auth middleware error:', error);
    next();
  }
}; 