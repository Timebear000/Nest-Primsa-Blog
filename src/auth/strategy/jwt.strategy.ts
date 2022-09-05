import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwt } from '../constants';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-token'),
      secretOrKey: jwt.secretKey,
      ignoreExpiration: false,
    });
  }
  async validate(payload: { id: string; sub: string }) {
    return await this.authService.get_user(payload.id);
  }
}
