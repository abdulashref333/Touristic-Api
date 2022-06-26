import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/at.strategy';
// import { AtStrategy } from './strategies/at.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
    }),
  ],
  providers: [AuthService, JwtStrategy, JWTAuthGuard],
  controllers: [AuthController],
  exports: [JWTAuthGuard],
})
export class AuthModule {}
