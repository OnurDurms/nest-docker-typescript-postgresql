import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  let currencyService: CurrencyService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<CurrencyController>(CurrencyController);
    currencyService = app.get<CurrencyService>(CurrencyService);
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
