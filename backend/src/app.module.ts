import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { storageConfig } from './app/config/storage.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot('mongodb://localhost/Hackathon'),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          rootPath: join(__dirname, '..', 'uploads'),
          serveRoot: config.get('upload.apiPath'),
        },
      ],
    }),

    MulterModule.register({ storage: storageConfig }),
    ProductsModule,
    CartsModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
