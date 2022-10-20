import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { ChatroomsService } from './chatrooms/chatrooms.service';
import { ChatroomsController } from './chatrooms/chatrooms.controller';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    EventsModule,
    UsersModule,
    ChatroomsModule,
    MessagesModule,
    AdminModule,
    AuthModule,
  ],

  controllers: [AppController, ChatroomsController],

  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    UsersService,
    ChatroomsService,
    PrismaService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  c;

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
