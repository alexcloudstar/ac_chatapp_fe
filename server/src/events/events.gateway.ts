import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async chat(@MessageBody() data: string): Promise<string> {
    return data;
  }
  async typing(@MessageBody() data: string): Promise<string> {
    return data;
  }
  async punish(@MessageBody() data: string): Promise<string> {
    return data;
  }
}
