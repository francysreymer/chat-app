import { Injectable } from '@nestjs/common';
//import { WsException } from '@nestjs/websockets';
//import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  //constructor(private authService: AuthService) {}
  constructor() {}

  //async getUserFromSocket(socket: Socket) {
  async getUserFromSocket() {
    //let auth_token = socket.handshake.headers.authorization;
    // get the token itself without "Bearer"
    //auth_token = auth_token.split(' ')[1];

    //const user = this.authService.getUserFromAuthenticationToken(auth_token);

    //if (!user) {
    //  throw new WsException('Invalid credentials.');
    //}
    //return user;
    return {
      name: 'test',
      username: 'test',
    };
  }
}
