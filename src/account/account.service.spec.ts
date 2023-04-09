import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

describe('AccountService', () => {
  let controller: AccountController;
  let accountService: AccountService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<AccountController>(AccountController);
    accountService = app.get<AccountService>(AccountService);
  })
  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });
});
