import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { Account } from '../account/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency,Account])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService]
})
export class CurrencyModule {}
