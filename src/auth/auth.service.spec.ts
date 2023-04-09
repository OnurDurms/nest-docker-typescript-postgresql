import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
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
    expect(authService).toBeDefined();
  });
});
