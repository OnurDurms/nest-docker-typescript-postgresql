import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  //create account
  async create(account: Account): Promise<Account> {
    const newAccount = this.accountRepository.create(account);
    return await this.accountRepository.save(newAccount);
  }

  // update account
  async update(id: number, account: Account): Promise<Account> {
    await this.accountRepository.update(id, account);
    return await this.accountRepository.findOne( { where : { id } } );
  }

    // get one account
    async findOne(id: number): Promise<Account> {
        return await this.accountRepository.findOne({ where : { id } });
    }
}