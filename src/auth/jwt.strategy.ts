import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import logger from 'src/logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validateHeaderName(id: number) {
    const user = await this.authService.userFindOne(id);
    if (user) {
      return user;
    } else {
      logger.warn({
        status: HttpStatus.UNAUTHORIZED,
        msg: 'Unauthorized access',
      });
      throw new UnauthorizedException();
    }
  }
}
