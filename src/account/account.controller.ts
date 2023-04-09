import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountResponse } from './account.swagger';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  //create account
  @ApiOkResponse({type: AccountResponse})
  @Post()
  async create(@Body() account: Account): Promise<Account | AccountResponse> {
    return await this.accountService.create(account);
  }

  //update account
  @ApiOkResponse({type:AccountResponse})
  @Put()
  async update(id: number, account: Account): Promise<Account | AccountResponse> {
    return this.accountService.update(id, account);
  }

  //get one account
  @ApiOkResponse({type:AccountResponse})
  @Get()
  async findOne(id: number): Promise<Account | AccountResponse> {
    const account = await this.accountService.findOne(id);
    if (!account) {
      throw new Error('Account not found');
    } else {
      return account;
    }
  }
}
