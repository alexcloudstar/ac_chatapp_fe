import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { ChatroomsService } from './chatrooms/chatrooms.service';
import { ChatroomsController } from './chatrooms/chatrooms.controller';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EventsModule, UsersModule, ChatroomsModule],
  controllers: [AppController, ChatroomsController],
  providers: [AppService, ChatroomsService, PrismaService],
})
export class AppModule {}
