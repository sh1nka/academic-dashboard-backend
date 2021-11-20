import { AuthDto } from '../dto/auth-dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { BAD_REQUEST } from '../../shared/error-messages';
import { UsersRepository } from '../repository/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthSignInService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<{ token: string }> {
    try {
      const { username, password } = authDto;
      const user = await this.usersRepository.findUser(username);
      if (!user) {
        throw new Error('User does not exist');
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const token: string = await this.jwtService.sign(payload);
        return { token };
      } else {
        throw new UnauthorizedException('Username or password incorrect');
      }
    } catch (error) {
      return BAD_REQUEST(error?.message);
    }
    return;
  }
}
