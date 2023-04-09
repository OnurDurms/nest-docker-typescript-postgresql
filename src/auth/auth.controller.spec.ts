import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
