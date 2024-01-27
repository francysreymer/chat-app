import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
type User = {
    id: string;
    username: string;
};
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    onlineUsers: User[];
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    getOnlineUsers(): User[];
    updateOnlineUsers(): void;
    listenForMessages(message: string): Promise<void>;
}
export {};
