import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);

  const isDev = process.env.NODE_ENV === 'development';

  res.status(500).json({
    success: false,
    message: isDev ? err.message : 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
};
