import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract Bearer token
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        request.user = decoded; // Attach decoded user to request
        return true;
      } catch (err) {
        return false; // Token is invalid
      }
    }
    return false; // No token provided
  }
}
