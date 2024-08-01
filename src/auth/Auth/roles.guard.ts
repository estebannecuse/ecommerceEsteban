import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
  export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
      const request = context.switchToHttp().getRequest(); 
      const user = request.user; 
      const hasRole = () =>  
        requiredRoles.some((role) => user?.roles?.includes(role));
      const valid = user && user.roles && hasRole(); 
      console.log("roles guard", user);
      if(!valid || user.roles != "Admin"){
        throw new UnauthorizedException("You don't have permission to access this resource");
      }
      return valid;
    }
  }