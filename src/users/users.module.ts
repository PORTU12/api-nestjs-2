import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/Auth/constants';
import { AuthEntity } from 'src/entities/Auth.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ProduitEntity } from '../entities/produit.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]),
  ],
  controllers: [UsersController],
  providers: [UserService]
})
export class UserModule {}
