import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class TestMiddleWare implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Test middleware::: ', req.params);
//     next();
//   }
// }

export const funcMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Test middleware::: ', req.params);
  next();
};
