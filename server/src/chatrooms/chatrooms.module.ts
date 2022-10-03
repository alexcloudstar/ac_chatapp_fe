import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatroomsController } from './chatrooms.controller';
import { ChatroomsService } from './chatrooms.service';

@Module({
  controllers: [ChatroomsController],
  providers: [ChatroomsService, PrismaService],
})
export class ChatroomsModule {}
