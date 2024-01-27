import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  //ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

type User = {
  id: string;
  username: string;
};

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  onlineUsers: User[] = [];

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.onlineUsers.push({
      id: client.id,
      username: 'test',
    });
    console.log('handleConnection client.id: ', client.id);
    this.updateOnlineUsers();
  }

  handleDisconnect(client: Socket) {
    //delete this.onlineUsers[client.id];
    this.onlineUsers = this.onlineUsers.filter((user) => user.id !== client.id);

    this.updateOnlineUsers();
  }

  getOnlineUsers(): User[] {
    return this.onlineUsers;
  }

  public updateOnlineUsers() {
    const onlineUsers = this.getOnlineUsers();
    this.server.emit('onlineUsers', onlineUsers);
  }

  @SubscribeMessage('message')
  async listenForMessages(
    @MessageBody() message: string,
    //@ConnectedSocket() socket: Socket,
  ) {
    console.log('listenForMessages message: ', message);
    //const user = await this.chatService.getUserFromSocket(socket);
    //const user = await this.chatService.getUserFromSocket();
    this.server.sockets.emit('message', { message: message, date: new Date() });
  }
}
