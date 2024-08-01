import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const date = new Date();
const localDateTime = date.toLocaleString();

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Global Middleware Url ${req.url} and method ${req.method} on the date and time ${localDateTime}` );
    next();
  }
}
