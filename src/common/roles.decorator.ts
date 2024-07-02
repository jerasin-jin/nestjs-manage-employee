import { SetMetadata } from '@nestjs/common';
import { MasterPosition } from '../position';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MasterPosition[]) =>
  SetMetadata(ROLES_KEY, roles);
