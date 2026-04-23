import { Request } from 'express';
import { RoleType } from './role.types';

export interface JWTPayload {
  id: string;
  email: string;
  roles: RoleType[];
  name?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
} 