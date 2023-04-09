import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
