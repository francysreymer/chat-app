export declare class ChatService {
    constructor();
    getUserFromSocket(): Promise<{
        name: string;
        username: string;
    }>;
}
