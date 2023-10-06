import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { CategoriesModule } from './categories/categories.module';
import { ComfortModule } from './comfort/comfort.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { Category } from './categories/models/category.model';
import { Comfort } from './comfort/models/comfort.model';
import { ComfortStadium } from './comfort_stadium/models/comfort_stadium.model';
import { Region } from './region/models/region.model';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { UserWallet } from './user_wallet/models/user_wallet.model';
import { UserCard } from './user_cards/models/user_card.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Category,
        Comfort,
        ComfortStadium,
        Region,
        UserWallet,
        UserCard,
      ],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    CategoriesModule,
    ComfortModule,
    ComfortStadiumModule,
    RegionModule,
    DistrictModule,
    MailModule,
    UserWalletModule,
    UserCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
