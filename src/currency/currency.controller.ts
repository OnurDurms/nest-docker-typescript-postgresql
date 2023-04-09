import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Currency } from './currency.entity';
import { Account } from '../account/account.entity';
import { CurrencyService } from './currency.service';
import { CurrencyResponse } from './currency.swagger';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get([':from/:to'])
  async findOne(@Param('to') to: string,@Param('from') from: string): Promise<Currency | CurrencyResponse> {
    const currency = await this.currencyService.findOne(from,to);
    if (!currency) {
      throw new Error('currency not found');
    } else {
      return currency;
    }
  }

    @Post()
    async create(@Body() body): Promise<Currency | Account | CurrencyResponse | object> {
      return await this.currencyService.create(body);
    }
}
