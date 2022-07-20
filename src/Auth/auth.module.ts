import { Module } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/Auth/constants';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/Auth/jwt.strategy';
import { ProduitEntity } from 'src/entities/produit.entity';
import { AuthEntity } from 'src/entities/Auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*Configure forFeature() in the UserModule to define
the repositories are registered in the current scope. With that in place, we can inject the
UsersRepository into the UsersService using "@InjectRepository()"*/
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3000s' },
  }), ConfigModule,],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
