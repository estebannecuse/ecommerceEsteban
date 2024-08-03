import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){ }
   canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if(!authHeader) throw new UnauthorizedException("Bearer token not found");
    const token = authHeader.split(' ')[1];
    if(!token || token === undefined){
      throw new UnauthorizedException("Token not found or undefined");
    }try {
      const secret = process.env.JWT_SECRET;
      const payload =  this.jwtService.verify(token, {secret});
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      request.user = payload;
      console.log("Token payload:", payload);
      return true;
    } catch (error) {
      throw new UnauthorizedException("Bearer token not valid");
    }  
  }
}



