import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../common/roles.decorator';
import { MasterPosition } from '../position';
import { Request as Req } from 'express';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<MasterPosition[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req: Req = context.switchToHttp().getRequest();
    const token = req.header('Authorization');

    if (token == null) {
      throw new UnauthorizedException();
    }

    const jwtDecode: Record<string, any> = jwt_decode(token);

    return requiredRoles.some((role) => jwtDecode.position?.includes(role));
  }
}
