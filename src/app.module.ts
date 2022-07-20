import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitModule } from './produit/produit.module';
import {AuthModule} from './Auth/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POST_HOST,
    port: +process.env.POST_PORT,
    username: process.env.POST_USER,
    password: process.env.POST_PASSWORD,
    database: process.env.POST_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, ProduitModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
