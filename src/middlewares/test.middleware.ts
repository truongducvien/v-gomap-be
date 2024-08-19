import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class TestMiddleWare implements NestMiddleware {
//   constructor() {}

//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.params);
//     next();
//   }
// }

export const testMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  next();
};
