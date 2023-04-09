import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';
import { Account } from '../account/account.entity';
import fetch from "node-fetch";

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  //accept offer
  async create(body): Promise<Account | object> {
    const {from,to,takenAccountId,givenAccountId,amount} = body;
    const oldOffer = await this.currencyRepository.findOne({ where : { from,to } ,order: { id: 'DESC' }});

    const takenAccount = await this.accountRepository.findOne({ where : { id: takenAccountId }});
    takenAccount.amount = takenAccount.amount + amount;
    takenAccount.price_total = takenAccount.price_total + (amount * oldOffer.price);
    await this.accountRepository.update(takenAccountId,takenAccount);

    const givenAccount = await this.accountRepository.findOne({ where : { id: givenAccountId }});
    givenAccount.amount = givenAccount.amount - amount; 
    takenAccount.price_total = takenAccount.price_total - (amount * oldOffer.price);
    await this.accountRepository.update(givenAccountId,givenAccount);

    return {"result": "success"};
  }
  // get offer
  async findOne(from: string,to: string): Promise<Currency> {
    const oldOffer = await this.currencyRepository.findOne({ where : [{ from,to }] ,order: { id: 'DESC' }});
    if(oldOffer && oldOffer.created_at && new Date(new Date(oldOffer.created_at).setMinutes(new Date(oldOffer.created_at).getMinutes() + 3)) > new Date()){
        return oldOffer;
    }else{
        const response = await fetch("https://api.apilayer.com/exchangerates_data/convert?to="+to+"&from="+from+"&amount=1", {
            method: 'GET',
            redirect: 'follow',
            headers: {"apikey": "RU3qs0RosGlQfNVPci8zaMHN1SlbjIlE"}
          });

        const result = await response.json();
        const fromValue = result.query.from;
        const toValue = result.query.to;
        const priceValue = result.result;
        const date = new Date();
        if(oldOffer){
          await this.currencyRepository.update(oldOffer.id, {from: fromValue,to: toValue,price: priceValue,created_at: date});
          return await this.currencyRepository.findOne( { where : { id: oldOffer.id } } );
        }else{
          const newCurrency = this.currencyRepository.create({from: fromValue,to: toValue,price: priceValue,created_at: date});
          return await this.currencyRepository.save(newCurrency);
        }
    }
  }
}