import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AccountModule } from '../account/account.module';
import { CurrencyModule } from '../currency/currency.module';
import { UsersService } from '../users/users.service';
import { AccountService } from '../account/account.service';
import { CurrencyService } from '../currency/currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Account } from '../account/account.entity';
import { Currency } from '../currency/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Currency]),
    UsersModule,
    AccountModule,
    CurrencyModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService,UsersService,AccountService,CurrencyService,JwtService],
  controllers: [AuthController],
  exports: [AuthService,UsersService,AccountService,CurrencyService,JwtService],
})
export class AuthModule {}