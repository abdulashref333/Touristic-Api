import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProgramModule } from './programs/programs.module';
import { AuthModule } from './auth/auth.module';
import { HistoricalPlacesModule } from './historical_places/historical_places.module';
import { BlogsModule } from './blogs/blogs.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    RestaurantModule,
    ProgramModule,
    AuthModule,
    HistoricalPlacesModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
