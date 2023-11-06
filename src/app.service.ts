import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessages(): string {
    return 'Hello World!';
  }
}
